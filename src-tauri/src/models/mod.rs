use diesel::{Connection, SqliteConnection};

pub mod app_state;
pub mod appeal_court;
pub mod group;
pub mod position;
pub mod role;
pub mod tag;
pub mod time_window;
pub mod tribunal;

pub fn establish_connection() -> SqliteConnection {
    SqliteConnection::establish("../../db/selection-poste-enm.sqlite3")
        .unwrap_or_else(|_| panic!("Error connecting to database"))
}
