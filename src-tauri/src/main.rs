#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
pub mod schema;
pub mod models;

use crate::models::appeal_court::*;
use crate::models::position::*;
use crate::models::tribunal::*;

#[tauri::command]
fn list_positions() -> Vec<Position> {
    position_list()
}

#[tauri::command]
fn list_tribunals() -> Vec<Tribunal> {
    tribunal_list()
}

#[tauri::command]
fn list_appeal_courts() -> Vec<AppealCourt> {
    appeal_court_list()
}

#[tauri::command]
fn update_appeal_court_color(id: i32, color: &str) -> AppealCourt {
    appeal_court_update(id, color)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            list_positions,
            list_tribunals,
            list_appeal_courts,
            update_appeal_court_color
        ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
