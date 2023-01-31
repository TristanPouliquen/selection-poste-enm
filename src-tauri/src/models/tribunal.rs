use diesel::prelude::*;
use serde::Serialize;
use crate::models::establish_connection;
use crate::schema::tribunals;

#[derive(Identifiable, Queryable, Serialize)]
#[diesel(belongs_to(AppealCourt))]
#[diesel(belongs_to(Group))]
pub struct Tribunal {
    pub id: i32,
    pub name: String,
    pub color: String,
    pub time_to: Option<i32>,
    pub appeal_court_id: i32,
    pub group_id: i32,
}

pub fn tribunal_list() -> Vec<Tribunal> {
    tribunals::dsl::tribunals
        .select(tribunals::all_columns)
        .load::<Tribunal>(&mut establish_connection())
        .expect("Loading tribunals failed")
}