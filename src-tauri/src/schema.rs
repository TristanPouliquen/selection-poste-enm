// @generated automatically by Diesel CLI.

diesel::table! {
    appeal_courts (id) {
        id -> Integer,
        name -> Text,
        color -> Text,
    }
}

diesel::table! {
    groups (id) {
        id -> Integer,
        name -> Text,
        color -> Text,
    }
}

diesel::table! {
    position_tags (id) {
        id -> Integer,
        tag_id -> Integer,
        position_id -> Integer,
    }
}

diesel::table! {
    positions (id) {
        id -> Integer,
        placed -> Bool,
        prevalent_domain -> Nullable<Text>,
        ranking -> Integer,
        notes -> Nullable<Text>,
        role_id -> Integer,
        tribunal_id -> Integer,
    }
}

diesel::table! {
    roles (id) {
        id -> Integer,
        name -> Text,
        color -> Text,
    }
}

diesel::table! {
    tags (id) {
        id -> Integer,
        name -> Text,
        color -> Text,
    }
}

diesel::table! {
    tribunals (id) {
        id -> Integer,
        name -> Text,
        color -> Text,
        time_to -> Nullable<Integer>,
        group_id -> Integer,
        appeal_court_id -> Integer,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    appeal_courts,
    groups,
    position_tags,
    positions,
    roles,
    tags,
    tribunals,
);
