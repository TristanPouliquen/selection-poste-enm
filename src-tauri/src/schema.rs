// @generated automatically by Diesel CLI.

diesel::table! {
    app_state (id) {
        id -> Integer,
        onboarded -> Bool,
        active_filters -> Nullable<Text>,
    }
}

diesel::table! {
    appeal_courts (id) {
        id -> Integer,
        name -> Text,
        color -> Text,
    }
}

diesel::table! {
    documents (id) {
        id -> Integer,
        name -> Text,
        path -> Text,
        size -> Integer,
        position_id -> Integer,
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
        taken -> Bool,
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
    time_windows (id) {
        id -> Integer,
        too_far -> Bool,
        min_time -> Integer,
        max_time -> Nullable<Integer>,
        color -> Text,
    }
}

diesel::table! {
    tribunals (id) {
        id -> Integer,
        name -> Text,
        notes -> Nullable<Text>,
        time_to -> Nullable<Integer>,
        color -> Text,
        group_id -> Integer,
        appeal_court_id -> Integer,
    }
}

diesel::joinable!(documents -> positions (position_id));
diesel::joinable!(position_tags -> positions (position_id));
diesel::joinable!(position_tags -> tags (tag_id));
diesel::joinable!(positions -> roles (role_id));
diesel::joinable!(positions -> tribunals (tribunal_id));
diesel::joinable!(tribunals -> appeal_courts (appeal_court_id));
diesel::joinable!(tribunals -> groups (group_id));

diesel::allow_tables_to_appear_in_same_query!(
    app_state,
    appeal_courts,
    documents,
    groups,
    position_tags,
    positions,
    roles,
    tags,
    time_windows,
    tribunals,
);
