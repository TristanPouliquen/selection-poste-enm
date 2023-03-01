use crate::models::establish_connection;
use crate::models::position::Position;
use crate::schema::documents;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(
    Identifiable, Queryable, Selectable, Serialize, Deserialize, Associations, AsChangeset,
)]
#[diesel(belongs_to(Position))]
#[serde(rename_all = "camelCase")]
pub struct Document {
    pub id: i32,
    pub name: String,
    pub path: String,
    pub size: i32,
    pub position_id: i32,
}

pub fn position_documents_list(db_path: String, position: Position) -> Vec<Document> {
    Document::belonging_to(&position)
        .select(Document::as_select())
        .load::<Document>(&mut establish_connection(&db_path))
        .expect("Error loading documents")
}

pub fn document_delete(db_path: String, document: Document) -> bool {
    diesel::delete(documents::table.find(document.id))
        .execute(&mut establish_connection(&db_path))
        .unwrap();
    true
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name=documents)]
#[serde(rename_all = "camelCase")]
pub struct NewDocument<'a> {
    pub name: &'a str,
    pub path: &'a str,
    pub size: i32,
    pub position_id: i32,
}

pub fn document_create(db_path: String, document: NewDocument) -> Document {
    diesel::insert_into(documents::dsl::documents)
        .values(&document)
        .get_result(&mut establish_connection(&db_path))
        .expect("Error creating document")
}
