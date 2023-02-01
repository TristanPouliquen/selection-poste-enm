use crate::schema::roles;
use diesel::prelude::*;
use serde::Serialize;

#[derive(Identifiable, Queryable, Serialize)]
pub struct Role {
    pub id: i32,
    pub name: String,
    pub color: String,
}
