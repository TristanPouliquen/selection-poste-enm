use crate::models::establish_connection;
use crate::schema::roles;
use diesel::prelude::*;
use serde::Serialize;

#[derive(Identifiable, Queryable, Serialize)]
pub struct Role {
    pub id: i32,
    pub name: String,
    pub color: String,
}

pub fn role_list() -> Vec<Role> {
    roles::dsl::roles
        .select(roles::all_columns)
        .load::<Role>(&mut establish_connection())
        .expect("Loading roles failed")
}
