use crate::models::establish_connection;
use crate::schema::roles;
use diesel::prelude::*;
use serde::Serialize;

#[derive(Identifiable, Queryable, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Role {
    pub id: i32,
    pub name: String,
    pub color: String,
}

pub fn role_list(db_path: String) -> Vec<Role> {
    roles::dsl::roles
        .select(roles::all_columns)
        .load::<Role>(&mut establish_connection(&db_path))
        .expect("Loading roles failed")
}
