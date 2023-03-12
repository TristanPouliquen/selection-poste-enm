use crate::models::establish_connection;
use crate::schema::tribunals;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Identifiable, Queryable, Serialize, AsChangeset, Deserialize)]
#[diesel(belongs_to(AppealCourt))]
#[diesel(belongs_to(Group))]
#[serde(rename_all = "camelCase")]
pub struct Tribunal {
    pub id: i32,
    pub name: String,
    pub notes: Option<String>,
    pub time_to: Option<i32>,
    pub color: String,
    pub group_id: i32,
    pub appeal_court_id: i32,
}

pub fn tribunal_list(db_path: String) -> Vec<Tribunal> {
    tribunals::dsl::tribunals
        .select(tribunals::all_columns)
        .load::<Tribunal>(&mut establish_connection(&db_path))
        .expect("Loading tribunals failed")
}

pub fn tribunal_update(db_path: String, tribunal: Tribunal) -> Tribunal {
    diesel::update(tribunals::table.find(tribunal.id))
        .set((
            tribunals::notes.eq(tribunal.notes),
            tribunals::time_to.eq(tribunal.time_to),
            tribunals::color.eq(tribunal.color),
        ))
        .get_result(&mut establish_connection(&db_path))
        .unwrap()
}

pub fn is_linked_to_appeal_court(db_path: &str, id_appeal_court: i32, id_tribunal: i32) -> bool {
    let query = tribunals::dsl::tribunals.find(id_tribunal);
    let mut connection = establish_connection(db_path);

    match query.first::<Tribunal>(&mut connection) {
        Ok(record) => {
            if record.appeal_court_id == id_appeal_court {
                return true;
            }
        }
        Err(diesel::NotFound) => println!("Not Found"),
        Err(_err) => println!("error"),
    }
    false
}

pub fn is_linked_to_group(db_path: &str, id_group: i32, id_tribunal: i32) -> bool {
    let query = tribunals::dsl::tribunals.find(id_tribunal);
    let mut connection = establish_connection(db_path);

    match query.first::<Tribunal>(&mut connection) {
        Ok(record) => {
            if record.group_id == id_group {
                return true;
            }
            return false;
        }
        Err(diesel::NotFound) => println!("Not Found"),
        Err(_err) => println!("error"),
    }
    false
}
