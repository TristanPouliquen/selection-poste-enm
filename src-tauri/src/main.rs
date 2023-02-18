#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
pub mod models;
pub mod schema;
extern crate diesel_migrations;

use crate::models::app_state::*;
use crate::models::appeal_court::*;
use crate::models::establish_connection;
use crate::models::group::*;
use crate::models::position::*;
use crate::models::role::*;
use crate::models::tag::*;
use crate::models::time_window::*;
use crate::models::tribunal::*;
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};

#[tauri::command]
fn get_app_state() -> AppState {
    app_state_get()
}

#[tauri::command]
fn update_app_state(app_state: AppState) -> AppState {
    app_state_update(app_state)
}

#[tauri::command]
fn get_appeal_courts() -> Vec<AppealCourt> {
    appeal_court_list()
}

#[tauri::command]
fn update_appeal_court(appeal_court: AppealCourt) -> AppealCourt {
    appeal_court_update(appeal_court)
}

#[tauri::command]
fn get_groups() -> Vec<Group> {
    group_list()
}

#[tauri::command]
fn get_positions() -> Vec<Position> {
    position_list()
}

#[tauri::command]
fn update_position(position: Position) -> Position {
    position_update(position)
}

#[tauri::command]
fn update_position_ranking(position: Position) -> Vec<Position> {
    position_update_ranking(position)
}

#[tauri::command]
fn get_roles() -> Vec<Role> {
    role_list()
}

#[tauri::command]
fn get_tags() -> Vec<Tag> {
    tag_list()
}

#[tauri::command]
fn get_tribunals() -> Vec<Tribunal> {
    tribunal_list()
}

#[tauri::command]
fn update_tribunal(tribunal: Tribunal) -> Tribunal {
    tribunal_update(tribunal)
}

#[tauri::command]
fn get_time_windows() -> Vec<TimeWindow> {
    time_window_list()
}

#[tauri::command]
fn update_time_window(time_window: TimeWindow) -> TimeWindow {
    time_window_update(time_window)
}

#[tauri::command]
fn create_time_window(time_window: NewTimeWindow) -> TimeWindow {
    time_window_create(time_window)
}

#[tauri::command]
fn delete_time_window(time_window: TimeWindow) -> bool {
    time_window_delete(time_window)
}

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("./migrations");

fn main() {
    let connection = &mut establish_connection();
    connection
        .run_pending_migrations(MIGRATIONS)
        .unwrap_or_else(|_| panic!("Error loading migrations"));
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_app_state,
            update_app_state,
            get_appeal_courts,
            update_appeal_court,
            get_groups,
            get_positions,
            update_position,
            update_position_ranking,
            get_roles,
            get_tags,
            get_tribunals,
            update_tribunal,
            get_time_windows,
            update_time_window,
            create_time_window,
            delete_time_window
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
