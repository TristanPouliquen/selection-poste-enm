use diesel::{Connection, SqliteConnection};
use dotenvy::dotenv;
use std::env;

pub mod app_state;
pub mod appeal_court;
pub mod group;
pub mod position;
pub mod role;
pub mod tag;
pub mod time_window;
pub mod tribunal;

pub fn establish_connection() -> SqliteConnection {
    dotenv().ok();

    let database_url = "../../db/selection-poste-enm.sqlite3";
    SqliteConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {database_url}"))
}
