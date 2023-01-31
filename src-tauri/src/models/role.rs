use diesel::prelude::*;
use serde::Serialize;
use crate::schema::roles;

#[derive(Identifiable, Queryable, Serialize)]
pub struct Role {
    pub id: i32,
    pub name: String,
    pub color: String,
}