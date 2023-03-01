use std::{string, ffi::c_void};

use crate::models::establish_connection;
use crate::schema::positions;
use diesel::dsl::count;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use super::tribunal;

#[derive(Identifiable, Queryable, Serialize, Deserialize, AsChangeset)]
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

pub fn position_list() -> Vec<Position> {
    positions::dsl::positions
        .select(positions::all_columns)
        .order((positions::ranking.asc(), positions::id.asc()))
        .load::<Position>(&mut establish_connection())
        .expect("Loading positions failed")
}

pub fn position_update(position: Position) -> Position {
    diesel::update(positions::table.find(position.id))
        .set((
            positions::notes.eq(position.notes),
            positions::prevalent_domain.eq(position.prevalent_domain),
            positions::taken.eq(position.taken),
        ))
        .get_result(&mut establish_connection())
        .unwrap()
}

pub fn position_update_ranking(mut position: Position) -> Vec<Position> {
    let total_positions = positions::dsl::positions
        .select(count(positions::id))
        .first(&mut establish_connection())
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
        .get_result::<Position>(&mut establish_connection())
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
        .execute(&mut establish_connection())
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
        .execute(&mut establish_connection())
        .expect("Failed updating ranking");
    }
    diesel::update(positions::table.find(position.id))
        .set(positions::ranking.eq(position.ranking))
        .execute(&mut establish_connection())
        .expect("Failed updating ranking");
    position_list()
}

pub fn position_sort(sortDataInput : SortDataInput) -> bool {
    let positions = position_list();

    let mut weighted_positions = Vec::<PositionWithWeight>::new();

    for (position) in positions{
        weighted_positions.push(PositionWithWeight{position : position, weight : 0})
    }

    let mut positive_weight : i32 = sortDataInput.positive.len().try_into().unwrap();
    for (positive) in sortDataInput.positive{
        match positive.0.as_str(){    
            "appeal_court" => sort_by_appeal_court(&weighted_positions, true, positive_weight, positive.1),
            "position" => sort_by_position(&weighted_positions, true, positive_weight),
            "journey_length" => sort_by_journey_length(&weighted_positions, true, positive_weight),
            _ => todo!(),
        };
        positive_weight -= 1;
    }

    let mut negative_weight : i32 = sortDataInput.negative.len().try_into().unwrap();
    for (negative) in sortDataInput.negative{
        match negative.0.as_str(){
            "appeal_court" => sort_by_appeal_court(&weighted_positions, false, positive_weight, negative.1),
            "position" => sort_by_position(&weighted_positions, false, positive_weight),
            "journey_length" => sort_by_journey_length(&weighted_positions, false, positive_weight),
            _ => todo!(),
        };
        negative_weight -= 1;
    }

    return true;
}

fn sort_by_appeal_court(weighted_positions : Vec::<PositionWithWeight>, isPositive : bool, weight : i32, positive_ids : Vec<i32>) -> bool{
    for (w_pos) in weighted_positions{
        for (idx) in &positive_ids{
            if (tribunal::is_linked_to_appeal_court(*idx, w_pos.position.tribunal_id)){
                if (isPositive){
                    w_pos.weight += weight;
                }
                else{
                    w_pos.weight -= weight;
                }
            }
        }
    }
    return true;
}

fn sort_by_position(weighted_positions : &Vec::<PositionWithWeight>, isPositive : bool, weight : i32) -> bool{

    return true;
}

fn sort_by_journey_length(weighted_positions : &Vec::<PositionWithWeight>, isPositive : bool, weight : i32) -> bool{

    return true;
}

struct PositionWithWeight{
    position : Position,
    weight : i32
}

#[derive(Serialize, Deserialize)]
pub struct SortDataInput{
    positive : Vec<(String, Vec<i32>)>,
    negative : Vec<(String, Vec<i32>)>
}
