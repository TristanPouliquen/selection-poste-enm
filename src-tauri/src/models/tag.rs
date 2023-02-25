use crate::models::establish_connection;
use crate::models::position::Position;
use crate::schema::{position_tags, tags};
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Identifiable, Queryable, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Tag {
    pub id: i32,
    pub name: String,
    pub color: String,
}

pub fn tag_list() -> Vec<Tag> {
    tags::dsl::tags
        .select(tags::all_columns)
        .load::<Tag>(&mut establish_connection())
        .expect("Failed loading Tags")
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name =tags)]
pub struct NewTag<'a> {
    pub name: &'a str,
    pub color: &'a str,
}

#[derive(Queryable, Serialize)]
#[diesel(belongs_to(Position))]
#[diesel(belongs_to(Tag))]
#[serde(rename_all = "camelCase")]
pub struct PositionTag {
    pub id: i32,
    pub position_id: i32,
    pub tag_id: i32,
}

pub fn position_tag_list(position: Position) -> Vec<Tag> {
    let tag_ids: Vec<i32> = position_tags::dsl::position_tags
        .select(position_tags::tag_id)
        .filter(position_tags::position_id.eq(position.id))
        .load::<i32>(&mut establish_connection())
        .expect("Error loading position tags");

    tags::dsl::tags
        .filter(tags::id.eq_any(tag_ids))
        .load::<Tag>(&mut establish_connection())
        .expect("Error loading tags")
}

pub fn position_tag_add(position: Position, tag: Tag) -> PositionTag {
    diesel::insert_into(position_tags::dsl::position_tags)
        .values((
            position_tags::position_id.eq(position.id),
            position_tags::tag_id.eq(tag.id),
        ))
        .get_result(&mut establish_connection())
        .expect("Error inserting new tag")
}

pub fn position_tag_remove(position: Position, tag: Tag) -> bool {
    diesel::delete(position_tags::dsl::position_tags)
        .filter(
            position_tags::position_id
                .eq(position.id)
                .and(position_tags::tag_id.eq(tag.id)),
        )
        .execute(&mut establish_connection())
        .expect("Error deleting relationship");

    let remaining_tag_uses: i32 = position_tags::dsl::position_tags
        .filter(position_tags::tag_id.eq(tag.id))
        .count()
        .get_result(&mut establish_connection())
        .map(|x: i64| x as i32)
        .unwrap();

    if remaining_tag_uses == 0 {
        diesel::delete(tags::dsl::tags.find(tag.id))
            .execute(&mut establish_connection())
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

pub fn tag_create(tag: NewTag) -> Tag {
    diesel::insert_into(tags::dsl::tags)
        .values(&tag)
        .get_result(&mut establish_connection())
        .expect("Error inserting tag")
}
