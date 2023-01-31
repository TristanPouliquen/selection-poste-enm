use diesel::prelude::*;
use serde::Serialize;
use crate::schema::{tags, position_tags};

#[derive(Identifiable, Queryable, Serialize)]
pub struct Tag {
    pub id: i32,
    pub name: String,
    pub color: String,
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