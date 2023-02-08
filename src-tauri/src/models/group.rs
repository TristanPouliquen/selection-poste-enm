use crate::models::establish_connection;
use crate::schema::groups;
use diesel::prelude::*;
use serde::Serialize;

#[derive(Identifiable, Queryable, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Group {
    pub id: i32,
    pub name: String,
    pub color: String,
}

pub fn group_list() -> Vec<Group> {
    groups::dsl::groups
        .select(groups::all_columns)
        .load::<Group>(&mut establish_connection())
        .expect("Unable to load groups")
}
