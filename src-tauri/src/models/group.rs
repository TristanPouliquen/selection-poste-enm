use crate::models::establish_connection;
use crate::schema::groups;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Identifiable, Queryable, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Group {
    pub id: i32,
    pub name: String,
    pub color: String,
}

pub fn group_list(db_path: String) -> Vec<Group> {
    groups::dsl::groups
        .select(groups::all_columns)
        .load::<Group>(&mut establish_connection(&db_path))
        .expect("Unable to load groups")
}

pub fn group_update(db_path: String, group: Group) -> Group {
    diesel::update(groups::table.find(group.id))
        .set(groups::color.eq(group.color))
        .get_result(&mut establish_connection(&db_path))
        .unwrap()
}
