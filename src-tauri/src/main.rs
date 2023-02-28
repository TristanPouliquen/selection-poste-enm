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

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("./migrations");
pub const DATABASE_NAME: &str = "selection-poste-enm.sqlite3";

fn get_db_path(app_handle: tauri::AppHandle) -> String {
    let mut app_dir = app_handle.path_resolver().app_data_dir().unwrap();
    app_dir.push(DATABASE_NAME);
    app_dir.display().to_string()
}

#[tauri::command]
fn get_app_state(app_handle: tauri::AppHandle) -> AppState {
    let db_path = get_db_path(app_handle);
    app_state_get(db_path)
}

#[tauri::command]
fn update_app_state(app_handle: tauri::AppHandle, app_state: AppState) -> AppState {
    let db_path = get_db_path(app_handle);
    app_state_update(db_path, app_state)
}

#[tauri::command]
fn get_appeal_courts(app_handle: tauri::AppHandle) -> Vec<AppealCourt> {
    let db_path = get_db_path(app_handle);
    appeal_court_list(db_path)
}

#[tauri::command]
fn update_appeal_court(app_handle: tauri::AppHandle, appeal_court: AppealCourt) -> AppealCourt {
    let db_path = get_db_path(app_handle);
    appeal_court_update(db_path, appeal_court)
}

#[tauri::command]
fn get_groups(app_handle: tauri::AppHandle) -> Vec<Group> {
    let db_path = get_db_path(app_handle);
    group_list(db_path)
}

#[tauri::command]
fn get_positions(app_handle: tauri::AppHandle) -> Vec<PositionWithTags> {
    let db_path = get_db_path(app_handle);
    position_list(db_path)
}

#[tauri::command]
fn get_position(app_handle: tauri::AppHandle, id: i32) -> PositionWithTags {
    let db_path = get_db_path(app_handle);
    position_get(db_path, id)
}

#[tauri::command]
fn update_position(app_handle: tauri::AppHandle, position: Position) -> Position {
    let db_path = get_db_path(app_handle);
    position_update(db_path, position)
}

#[tauri::command]
fn update_position_ranking(
    app_handle: tauri::AppHandle,
    position: Position,
) -> Vec<PositionWithTags> {
    let db_path = get_db_path(app_handle);
    position_update_ranking(db_path, position)
}

#[tauri::command]
fn add_position_tag(app_handle: tauri::AppHandle, position: Position, tag: Tag) -> PositionTag {
    let db_path = get_db_path(app_handle);
    position_tag_add(db_path, position, tag)
}

#[tauri::command]
fn remove_position_tag(app_handle: tauri::AppHandle, position: Position, tag: Tag) -> bool {
    let db_path = get_db_path(app_handle);
    position_tag_remove(db_path, position, tag)
}

#[tauri::command]
fn get_roles(app_handle: tauri::AppHandle) -> Vec<Role> {
    let db_path = get_db_path(app_handle);
    role_list(db_path)
}

#[tauri::command]
fn get_tags(app_handle: tauri::AppHandle) -> Vec<Tag> {
    let db_path = get_db_path(app_handle);
    tag_list(db_path)
}

#[tauri::command]
fn update_tag(app_handle: tauri::AppHandle, tag: Tag) -> Tag {
    let db_path = get_db_path(app_handle);
    tag_update(db_path, tag)
}

#[tauri::command]
fn delete_tag(app_handle: tauri::AppHandle, tag: Tag) -> bool {
    let db_path = get_db_path(app_handle);
    tag_delete(db_path, tag)
}

#[tauri::command]
fn create_tag(app_handle: tauri::AppHandle, tag: NewTag) -> Tag {
    let db_path = get_db_path(app_handle);
    tag_create(db_path, tag)
}

#[tauri::command]
fn get_tribunals(app_handle: tauri::AppHandle) -> Vec<Tribunal> {
    let db_path = get_db_path(app_handle);
    tribunal_list(db_path)
}

#[tauri::command]
fn update_tribunal(app_handle: tauri::AppHandle, tribunal: Tribunal) -> Tribunal {
    let db_path = get_db_path(app_handle);
    tribunal_update(db_path, tribunal)
}

#[tauri::command]
fn get_time_windows(app_handle: tauri::AppHandle) -> Vec<TimeWindow> {
    let db_path = get_db_path(app_handle);
    time_window_list(db_path)
}

#[tauri::command]
fn update_time_window(app_handle: tauri::AppHandle, time_window: TimeWindow) -> TimeWindow {
    let db_path = get_db_path(app_handle);
    time_window_update(db_path, time_window)
}

#[tauri::command]
fn create_time_window(app_handle: tauri::AppHandle, time_window: NewTimeWindow) -> TimeWindow {
    let db_path = get_db_path(app_handle);
    time_window_create(db_path, time_window)
}

#[tauri::command]
fn delete_time_window(app_handle: tauri::AppHandle, time_window: TimeWindow) -> bool {
    let db_path = get_db_path(app_handle);
    time_window_delete(db_path, time_window)
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let mut dir_path = app.path_resolver().app_data_dir().unwrap();
            let _ = std::fs::create_dir_all(&dir_path);
            dir_path.push(DATABASE_NAME);
            let path = dir_path.display().to_string();
            let connection = &mut establish_connection(&path);
            connection
                .run_pending_migrations(MIGRATIONS)
                .expect("Error running pending migrations");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_app_state,
            update_app_state,
            get_appeal_courts,
            update_appeal_court,
            get_groups,
            get_positions,
            get_position,
            update_position,
            update_position_ranking,
            add_position_tag,
            remove_position_tag,
            get_roles,
            get_tags,
            create_tag,
            update_tag,
            delete_tag,
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
