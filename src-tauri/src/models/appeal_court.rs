use crate::models::establish_connection;
use crate::schema::appeal_courts;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Identifiable, Queryable, Serialize, Deserialize, AsChangeset)]
#[serde(rename_all = "camelCase")]
pub struct AppealCourt {
    pub id: i32,
    pub name: String,
    pub color: String,
}

pub fn appeal_court_list(db_path: String) -> Vec<AppealCourt> {
    appeal_courts::dsl::appeal_courts
        .select(appeal_courts::all_columns)
        .load::<AppealCourt>(&mut establish_connection(&db_path))
        .expect("Loading appeal courts failed")
}

pub fn appeal_court_update(
    db_path: String,
    appeal_court: AppealCourt,
) -> AppealCourt {
    diesel::update(appeal_courts::table.find(appeal_court.id))
        .set(&appeal_court)
        .get_result(&mut establish_connection(&db_path))
        .unwrap_or_else(|_| panic!("Unable to find Appeal court {0}", appeal_court.id))
}
