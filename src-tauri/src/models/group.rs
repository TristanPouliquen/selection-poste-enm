use diesel::prelude::*;
use serde::Serialize;
use crate::schema::groups;

#[derive(Identifiable, Queryable, Serialize)]
pub struct Group {
    pub id: i32,
    pub name: String,
    pub color: String,
}