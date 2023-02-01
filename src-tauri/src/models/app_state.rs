use diesel::prelude::*;
use serde::Serialize;
use crate::schema::app_states;

#[derive(Queryable, Serialize)]
#[diesel(table_name = "app_state")]
pub struct AppState {
    pub id: i32,
    pub onboarded: bool,
    pub activeFilters: Option<String>
}