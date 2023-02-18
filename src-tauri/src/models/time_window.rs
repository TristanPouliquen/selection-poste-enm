use crate::models::establish_connection;
use crate::schema::time_windows;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Identifiable, Queryable, AsChangeset, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TimeWindow {
    pub id: i32,
    pub too_far: bool,
    pub min_time: i32,
    pub max_time: Option<i32>,
    pub color: String,
}

pub fn time_window_list() -> Vec<TimeWindow> {
    time_windows::dsl::time_windows
        .select(time_windows::all_columns)
        .load::<TimeWindow>(&mut establish_connection())
        .expect("Unable to load time windows")
}

pub fn time_window_update(time_window: TimeWindow) -> TimeWindow {
    diesel::update(time_windows::table.find(time_window.id))
        .set(&time_window)
        .get_result(&mut establish_connection())
        .unwrap()
}

pub fn time_window_delete(time_window: TimeWindow) -> bool {
    diesel::delete(time_windows::table.find(time_window.id))
        .execute(&mut establish_connection())
        .unwrap();

    true
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = time_windows)]
#[serde(rename_all = "camelCase")]
pub struct NewTimeWindow<'a> {
    pub color: &'a str,
    pub too_far: bool,
    pub min_time: i32,
    pub max_time: Option<i32>,
}

pub fn time_window_create(time_window: NewTimeWindow) -> TimeWindow {
    diesel::insert_into(time_windows::dsl::time_windows)
        .values(&time_window)
        .get_result(&mut establish_connection())
        .expect("Error inserting time_window")
}
