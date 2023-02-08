use crate::models::establish_connection;
use crate::schema::{position_tags, tags};
use diesel::prelude::*;
use serde::Serialize;

#[derive(Identifiable, Queryable, Serialize)]
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

#[derive(Insertable)]
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

#[derive(Insertable)]
#[diesel(table_name =position_tags)]
pub struct NewPositionTag<'a> {
    pub position_id: &'a i32,
    pub tag_id: &'a i32,
}
