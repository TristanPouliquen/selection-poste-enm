use crate::models::establish_connection;
use crate::models::tag::{PositionTag, Tag};
use crate::schema::positions;
use crate::schema::tags;
use diesel::dsl::count;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use std::option::Option;

use super::tribunal;

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

struct PositionWithWeight {
    position: PositionWithTags,
    weight: i32,
}

#[derive(Deserialize)]
pub struct SortDataInput {
    positive: Vec<Criterion>,
    negative: Vec<Criterion>,
}

#[derive(Deserialize)]
#[serde(untagged)]
pub enum CriterionValue {
    IntegerArray(Vec<i32>),
    Name(String),
    Boolean(bool),
}

#[derive(Deserialize)]
pub struct Criterion {
    name: String,
    value: CriterionValue,
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

pub fn position_rank(path: String, sort_data_input: SortDataInput) -> bool {
    let positions = position_list(path.to_string());

    let mut weighted_positions = Vec::<PositionWithWeight>::new();

    for position in positions {
        weighted_positions.push(PositionWithWeight {
            position,
            weight: 0,
        })
    }

    let mut positive_weight: i32 = sort_data_input.positive.len().try_into().unwrap();
    for positive_criterion in sort_data_input.positive {
        match positive_criterion.name.as_str() {
            "appealCourt" => {
                weighted_positions = sort_by_appeal_court(
                    &path,
                    weighted_positions,
                    true,
                    positive_weight,
                    positive_criterion.value,
                )
            }
            "group" => {
                weighted_positions = sort_by_group(
                    &path,
                    weighted_positions,
                    true,
                    positive_weight,
                    positive_criterion.value,
                )
            }
            "role" => {
                weighted_positions = sort_by_role(
                    weighted_positions,
                    true,
                    positive_weight,
                    positive_criterion.value,
                )
            }
            "tribunal" => {
                weighted_positions = sort_by_tribunal(
                    weighted_positions,
                    true,
                    positive_weight,
                    positive_criterion.value,
                )
            }
            "placed" => {
                weighted_positions = sort_by_placed(
                    weighted_positions,
                    true,
                    positive_weight,
                    positive_criterion.value,
                )
            }
            "prevalent_domain" => {
                weighted_positions = sort_by_prevalent_domain(
                    weighted_positions,
                    true,
                    positive_weight,
                    positive_criterion.value,
                )
            }
            _ => todo!(),
        };
        positive_weight -= 1;
    }

    let mut negative_weight: i32 = sort_data_input.negative.len().try_into().unwrap();
    for negative_criterion in sort_data_input.negative {
        match negative_criterion.name.as_str() {
            "appealCourt" => {
                weighted_positions = sort_by_appeal_court(
                    &path,
                    weighted_positions,
                    false,
                    negative_weight,
                    negative_criterion.value,
                )
            }
            "group" => {
                weighted_positions = sort_by_group(
                    &path,
                    weighted_positions,
                    false,
                    negative_weight,
                    negative_criterion.value,
                )
            }
            "role" => {
                weighted_positions = sort_by_role(
                    weighted_positions,
                    false,
                    negative_weight,
                    negative_criterion.value,
                )
            }
            "tribunal" => {
                weighted_positions = sort_by_tribunal(
                    weighted_positions,
                    false,
                    negative_weight,
                    negative_criterion.value,
                )
            }
            "placed" => {
                weighted_positions = sort_by_placed(
                    weighted_positions,
                    false,
                    negative_weight,
                    negative_criterion.value,
                )
            }
            "prevalent_domain" => {
                weighted_positions = sort_by_prevalent_domain(
                    weighted_positions,
                    false,
                    negative_weight,
                    negative_criterion.value,
                )
            }
            _ => todo!(),
        };
        negative_weight -= 1;
    }

    order_weighted_positions_to_positions_with_tag(path, weighted_positions);

    true
}

fn sort_by_appeal_court(
    path: &str,
    mut weighted_positions: Vec<PositionWithWeight>,
    is_positive: bool,
    weight: i32,
    value: CriterionValue,
) -> Vec<PositionWithWeight> {
    match value {
        CriterionValue::IntegerArray(appeal_court_index_appeal_court_index_array) => {
            for mut w_pos in weighted_positions.iter_mut() {
                for idx in &appeal_court_index_appeal_court_index_array {
                    if tribunal::is_linked_to_appeal_court(
                        path,
                        *idx,
                        w_pos.position.position.tribunal_id,
                    ) {
                        if is_positive {
                            w_pos.weight += weight;
                        } else {
                            w_pos.weight -= weight;
                        }
                    }
                }
            }
        }
        CriterionValue::Boolean(boolean) => {
            println!("boolean: {boolean}");
        }
        CriterionValue::Name(name) => {
            println!("name: {name}");
        }
    }

    weighted_positions
}

fn sort_by_group(
    path: &str,
    mut weighted_positions: Vec<PositionWithWeight>,
    is_positive: bool,
    weight: i32,
    value: CriterionValue,
) -> Vec<PositionWithWeight> {
    match value {
        CriterionValue::IntegerArray(group_index_group_index_array) => {
            for w_pos in weighted_positions.iter_mut() {
                for idx in &group_index_group_index_array {
                    if tribunal::is_linked_to_group(path, *idx, w_pos.position.position.tribunal_id)
                    {
                        if is_positive {
                            w_pos.weight += weight;
                        } else {
                            w_pos.weight -= weight;
                        }
                    }
                }
            }
        }
        CriterionValue::Boolean(boolean) => {
            println!("boolean: {boolean}");
        }
        CriterionValue::Name(name) => {
            println!("name: {name}");
        }
    }
    weighted_positions
}

fn sort_by_tribunal(
    mut weighted_positions: Vec<PositionWithWeight>,
    is_positive: bool,
    weight: i32,
    value: CriterionValue,
) -> Vec<PositionWithWeight> {
    match value {
        CriterionValue::IntegerArray(tribunal_index_tribunal_index_array) => {
            for w_pos in weighted_positions.iter_mut() {
                for idx in &tribunal_index_tribunal_index_array {
                    if w_pos.position.position.tribunal_id == *idx {
                        if is_positive {
                            w_pos.weight += weight;
                        } else {
                            w_pos.weight -= weight;
                        }
                    }
                }
            }
        }
        CriterionValue::Boolean(boolean) => {
            println!("boolean: {boolean}");
        }
        CriterionValue::Name(name) => {
            println!("name: {name}");
        }
    }
    weighted_positions
}

fn sort_by_role(
    mut weighted_positions: Vec<PositionWithWeight>,
    is_positive: bool,
    weight: i32,
    value: CriterionValue,
) -> Vec<PositionWithWeight> {
    match value {
        CriterionValue::IntegerArray(role_index_role_index_array) => {
            for w_pos in weighted_positions.iter_mut() {
                for idx in &role_index_role_index_array {
                    if w_pos.position.position.role_id == *idx {
                        if is_positive {
                            w_pos.weight += weight;
                        } else {
                            w_pos.weight -= weight;
                        }
                    }
                }
            }
        }
        CriterionValue::Boolean(boolean) => {
            println!("boolean: {boolean}");
        }
        CriterionValue::Name(name) => {
            println!("name: {name}");
        }
    }
    weighted_positions
}

fn sort_by_placed(
    mut weighted_positions: Vec<PositionWithWeight>,
    is_positive: bool,
    weight: i32,
    value: CriterionValue,
) -> Vec<PositionWithWeight> {
    match value {
        CriterionValue::IntegerArray(_array) => {
            println!("array");
        }
        CriterionValue::Boolean(is_placed) => {
            for w_pos in weighted_positions.iter_mut() {
                if w_pos.position.position.placed == is_placed {
                    if is_positive {
                        w_pos.weight += weight;
                    } else {
                        w_pos.weight -= weight;
                    }
                }
            }
        }
        CriterionValue::Name(name) => {
            println!("name: {name}");
        }
    }
    weighted_positions
}

fn sort_by_prevalent_domain(
    mut weighted_positions: Vec<PositionWithWeight>,
    is_positive: bool,
    weight: i32,
    value: CriterionValue,
) -> Vec<PositionWithWeight> {
    match value {
        CriterionValue::IntegerArray(_array) => {
            println!("array");
        }
        CriterionValue::Boolean(boolean) => {
            println!("boolean: {boolean}");
        }
        CriterionValue::Name(_name) => {
            let prevalent_domain_id: Option<String> = Some(String::from(_name));
            for w_pos in weighted_positions.iter_mut() {
                if w_pos.position.position.prevalent_domain == prevalent_domain_id {
                    if is_positive {
                        w_pos.weight += weight;
                    } else {
                        w_pos.weight -= weight;
                    }
                }
            }
        }
    }
    weighted_positions
}

fn order_weighted_positions_to_positions_with_tag(
    path: String,
    mut weighted_positions: Vec<PositionWithWeight>,
) -> bool {
    weighted_positions.sort_by_key(|weighted_position| -weighted_position.weight);
    for (i, item) in weighted_positions.iter_mut().enumerate() {
        diesel::update(positions::dsl::positions.find(item.position.position.id))
            .set(positions::ranking.eq(i as i32 + 1))
            .execute(&mut establish_connection(&path))
            .unwrap();
    }
    true
}
