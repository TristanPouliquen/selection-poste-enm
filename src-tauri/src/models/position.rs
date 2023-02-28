use crate::models::establish_connection;
use crate::models::tag::{PositionTag, Tag};
use crate::schema::positions;
use crate::schema::tags;
use diesel::dsl::count;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Identifiable, Queryable, Selectable, Serialize, Deserialize, AsChangeset)]
#[diesel(belongs_to(Tribunal))]
#[diesel(belongs_to(Role))]
#[serde(rename_all = "camelCase")]
pub struct Position {
    pub id: i32,
    pub placed: bool,
    pub prevalent_domain: Option<String>,
    pub ranking: i32,
    pub notes: Option<String>,
    pub taken: bool,
    pub role_id: i32,
    pub tribunal_id: i32,
}

#[derive(Serialize)]
pub struct PositionWithTags {
    #[serde(flatten)]
    position: Position,
    tags: Vec<Tag>,
}

pub fn position_list(db_path: String) -> Vec<PositionWithTags> {
    let all_positions = positions::table
        .select(Position::as_select())
        .order((positions::ranking.asc(), positions::id.asc()))
        .load::<Position>(&mut establish_connection(&db_path))
        .expect("Error loading positions");
    let all_tags = PositionTag::belonging_to(&all_positions)
        .inner_join(tags::table)
        .select((PositionTag::as_select(), Tag::as_select()))
        .load(&mut establish_connection(&db_path))
        .expect("Error loading tags");

    all_tags
        .grouped_by(&all_positions)
        .into_iter()
        .zip(all_positions)
        .map(|(t, position)| {
            (
                position,
                t.into_iter().map(|(_, tag)| tag).collect::<Vec<Tag>>(),
            )
        })
        .collect::<Vec<(Position, Vec<Tag>)>>()
        .into_iter()
        .map(|(position, tags)| PositionWithTags { position, tags })
        .collect()
}

pub fn position_get(db_path: String, id: i32) -> PositionWithTags {
    let position = positions::dsl::positions
        .find(id)
        .first::<Position>(&mut establish_connection(&db_path))
        .expect("Error loading position");
    let tags = PositionTag::belonging_to(&position)
        .inner_join(tags::table)
        .select(Tag::as_select())
        .load::<Tag>(&mut establish_connection(&db_path))
        .expect("Error loading tags");

    PositionWithTags { position, tags }
}

pub fn position_update(db_path: String, position: Position) -> Position {
    diesel::update(positions::table.find(position.id))
        .set((
            positions::notes.eq(position.notes),
            positions::prevalent_domain.eq(position.prevalent_domain),
            positions::taken.eq(position.taken),
        ))
        .get_result(&mut establish_connection(&db_path))
        .unwrap()
}

pub fn position_update_ranking(db_path: String, mut position: Position) -> Vec<PositionWithTags> {
    let total_positions = positions::dsl::positions
        .select(count(positions::id))
        .first(&mut establish_connection(&db_path))
        .map(|x: i64| x as i32)
        .unwrap_or_else(|_| panic!("Unable to count Positions"));
    if position.ranking < 1 {
        position.ranking = 1;
    }
    if position.ranking > total_positions {
        position.ranking = total_positions;
    }
    let previous_position: Position = positions::table
        .find(position.id)
        .get_result::<Position>(&mut establish_connection(&db_path))
        .unwrap_or_else(|_| panic!("Unable to find Position {0}", position.id));
    if previous_position.ranking > position.ranking {
        diesel::update(
            positions::table.filter(
                positions::ranking
                    .ge(position.ranking)
                    .and(positions::ranking.lt(previous_position.ranking)),
            ),
        )
        .set(positions::ranking.eq(positions::ranking + 1))
        .execute(&mut establish_connection(&db_path))
        .expect("Failed updating ranking");
    } else {
        diesel::update(
            positions::table.filter(
                positions::ranking
                    .gt(previous_position.ranking)
                    .and(positions::ranking.le(position.ranking)),
            ),
        )
        .set(positions::ranking.eq(positions::ranking - 1))
        .execute(&mut establish_connection(&db_path))
        .expect("Failed updating ranking");
    }
    diesel::update(positions::table.find(position.id))
        .set(positions::ranking.eq(position.ranking))
        .execute(&mut establish_connection(&db_path))
        .expect("Failed updating ranking");
    position_list(db_path)
}

pub fn position_sort(sortDataInput : SortDataInput) -> bool {
    let positions = position_list();

    let mut weighted_positions = Vec::<PositionWithWeight>::new();

    for (positive) in sortDataInput.positive.iter().enumerate(){
        match positive.1.0{
        
            _ => todo!(),
        }
    }

    for (negative) in sortDataInput.negative.iter().enumerate(){
        match negative.1.0{
        
            _ => todo!(),
        }
    }

    return true;
}

struct PositionWithWeight{
    position : Position,
    weight : i32
}

#[derive(Serialize, Deserialize)]
pub struct SortDataInput{
    positive : Vec<(String, Vec<String>)>,
    negative : Vec<(String, Vec<String>)>
}
