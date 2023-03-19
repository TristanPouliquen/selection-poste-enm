use crate::models::establish_connection;
use crate::schema::roles;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Identifiable, Queryable, Serialize, Deserialize)]
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

pub fn role_update(db_path: String, role: Role) -> Role {
    diesel::update(roles::table.find(role.id))
        .set(roles::color.eq(role.color))
        .get_result(&mut establish_connection(&db_path))
        .unwrap()
}
