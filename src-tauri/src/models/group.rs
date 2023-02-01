use crate::schema::groups;
use diesel::prelude::*;
use serde::Serialize;

#[derive(Identifiable, Queryable, Serialize)]
pub struct Group {
    pub id: i32,
    pub name: String,
    pub color: String,
}
