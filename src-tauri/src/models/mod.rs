use diesel::{Connection, SqliteConnection};
use tauri::api::path::app_data_dir;

pub mod app_state;
pub mod appeal_court;
pub mod group;
pub mod position;
pub mod role;
pub mod tag;
pub mod time_window;
pub mod tribunal;

pub fn establish_connection() -> SqliteConnection {
    let mut path = app_data_dir(&Default::default()).unwrap();
    path.push("selection-poste-enm.sqlite3");
    SqliteConnection::establish(&path.display().to_string())
        .unwrap_or_else(|_| panic!("Error connecting to database"))
}
