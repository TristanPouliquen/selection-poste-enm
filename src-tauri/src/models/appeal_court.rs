use crate::models::establish_connection;
use crate::schema::appeal_courts;
use diesel::prelude::*;
use serde::Serialize;

#[derive(Identifiable, Queryable, Serialize)]
pub struct AppealCourt {
    pub id: i32,
    pub name: String,
    pub color: String,
}

pub fn appeal_court_list() -> Vec<AppealCourt> {
    appeal_courts::dsl::appeal_courts
        .select(appeal_courts::all_columns)
        .load::<AppealCourt>(&mut establish_connection())
        .expect("Loading appeal courts failed")
}

pub fn appeal_court_update(id: i32, color: &str) -> AppealCourt {
    let connection: &mut SqliteConnection = &mut establish_connection();
    let appeal_court: AppealCourt = appeal_courts::dsl::appeal_courts
        .find(id)
        .first(connection)
        .expect("Appeal court not found");
    let _ = diesel::update(&appeal_court)
        .set(appeal_courts::color.eq(color))
        .execute(connection)
        .unwrap_or_else(|_| panic!("Unable to find Appeal court {id}"));
    appeal_courts::dsl::appeal_courts
        .find(id)
        .first(connection)
        .unwrap_or_else(|_| panic!("Unable to find Appeal court {id}"))
}
