use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use crate::models::establish_connection;
use crate::schema::app_state;

#[derive(Queryable, Serialize, Deserialize, AsChangeset)]
#[diesel(table_name = app_state)]
#[serde(rename_all = "camelCase")]
pub struct AppState {
    pub id: i32,
    pub onboarded: bool,
    pub active_filters: Option<String>
}

pub fn app_state_get() -> AppState {
    app_state::dsl::app_state.first(&mut establish_connection()).expect("Failed loading app state")
}

pub fn app_state_update(app_state: AppState) -> AppState {
    diesel::update(app_state::table.find(app_state.id))
        .set(&app_state)
        .get_result(&mut establish_connection())
        .unwrap()
}