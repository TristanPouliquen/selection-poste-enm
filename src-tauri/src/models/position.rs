use diesel::prelude::*;
use serde::Serialize;
use crate::models::establish_connection;
use crate::schema::positions;

#[derive(Identifiable, Queryable, Serialize)]
#[diesel(belongs_to(Tribunal))]
#[diesel(belongs_to(Role))]
pub struct Position {
    pub id: i32,
    pub placed: bool,
    pub prevalent_domain: Option<String>,
    pub ranking: i32,
    pub notes: Option<String>,
    pub tribunal_id: i32,
    pub role_id: i32,
}

pub fn position_list() -> Vec<Position> {
    positions::dsl::positions
        .select(positions::all_columns)
        .load::<Position>(&mut establish_connection())
        .expect("Loading positions failed")
}