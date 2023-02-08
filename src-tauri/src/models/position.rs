use crate::models::establish_connection;
use crate::schema::positions;
use diesel::prelude::*;
use serde::{Serialize, Deserialize};

#[derive(Identifiable, Queryable, Serialize, Deserialize, AsChangeset)]
#[diesel(belongs_to(Tribunal))]
#[diesel(belongs_to(Role))]
#[serde(rename_all = "camelCase")]
pub struct Position {
    pub id: i32,
    pub placed: bool,
    pub prevalent_domain: Option<String>,
    pub ranking: i32,
    pub notes: Option<String>,
    pub taken: bool,
    pub role_id: i32,
    pub tribunal_id: i32,
}

pub fn position_list() -> Vec<Position> {
    positions::dsl::positions
        .select(positions::all_columns)
        .load::<Position>(&mut establish_connection())
        .expect("Loading positions failed")
}

pub fn position_update(position: Position) -> Position {
    diesel::update(positions::table.find(position.id))
        .set((
            positions::ranking.eq(position.ranking),
            positions::notes.eq(position.notes),
            positions::prevalent_domain.eq(position.prevalent_domain),
            positions::taken.eq(position.taken)
        ))
        .get_result(&mut establish_connection())
        .unwrap()
}
