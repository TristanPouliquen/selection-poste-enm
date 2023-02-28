use crate::models::establish_connection;
use crate::models::position::Position;
use crate::schema::{position_tags, tags};
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Identifiable, Queryable, Selectable, Serialize, Deserialize, AsChangeset)]
#[serde(rename_all = "camelCase")]
pub struct Tag {
    pub id: i32,
    pub name: String,
    pub color: String,
}

pub fn tag_list(db_path: String) -> Vec<Tag> {
    tags::dsl::tags
        .select(tags::all_columns)
        .load::<Tag>(&mut establish_connection(&db_path))
        .expect("Failed loading Tags")
}

pub fn tag_update(db_path: String, tag: Tag) -> Tag {
    diesel::update(tags::table.find(tag.id))
        .set(&tag)
        .get_result(&mut establish_connection(&db_path))
        .unwrap()
}

pub fn tag_delete(db_path: String, tag: Tag) -> bool {
    diesel::delete(tags::table.find(tag.id))
        .execute(&mut establish_connection(&db_path))
        .unwrap();
    true
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name =tags)]
pub struct NewTag<'a> {
    pub name: &'a str,
    pub color: &'a str,
}

#[derive(Identifiable, Queryable, Selectable, Serialize, Associations)]
#[diesel(belongs_to(Position))]
#[diesel(belongs_to(Tag))]
#[serde(rename_all = "camelCase")]
pub struct PositionTag {
    pub id: i32,
    pub position_id: i32,
    pub tag_id: i32,
}

pub fn position_tag_add(
    db_path: String,
    position: Position,
    tag: Tag,
) -> PositionTag {
    diesel::insert_into(position_tags::dsl::position_tags)
        .values((
            position_tags::position_id.eq(position.id),
            position_tags::tag_id.eq(tag.id),
        ))
        .get_result(&mut establish_connection(&db_path))
        .expect("Error inserting new tag")
}

pub fn position_tag_remove(db_path: String, position: Position, tag: Tag) -> bool {
    diesel::delete(position_tags::dsl::position_tags)
        .filter(
            position_tags::position_id
                .eq(position.id)
                .and(position_tags::tag_id.eq(tag.id)),
        )
        .execute(&mut establish_connection(&db_path))
        .expect("Error deleting relationship");

    let remaining_tag_uses: i32 = position_tags::dsl::position_tags
        .filter(position_tags::tag_id.eq(tag.id))
        .count()
        .get_result(&mut establish_connection(&db_path))
        .map(|x: i64| x as i32)
        .unwrap();

    if remaining_tag_uses == 0 {
        diesel::delete(tags::dsl::tags.find(tag.id))
            .execute(&mut establish_connection(&db_path))
            .expect("Error deleting tag");
        false
    } else {
        true
    }
}

#[derive(Insertable)]
#[diesel(table_name =position_tags)]
pub struct NewPositionTag<'a> {
    pub position_id: &'a i32,
    pub tag_id: &'a i32,
}

pub fn tag_create(db_path: String, tag: NewTag) -> Tag {
    diesel::insert_into(tags::dsl::tags)
        .values(&tag)
        .get_result(&mut establish_connection(&db_path))
        .expect("Error inserting tag")
}
