CREATE TABLE tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(7) NOT NULL DEFAULT '#797979'
);

CREATE TABLE `groups` (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name VARCHAR(10) NOT NULL,
    color VARCHAR(7) NOT NULL DEFAULT '#797979'
);

CREATE TABLE appeal_courts (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(7) NOT NULL DEFAULT '#797979'
);

CREATE TABLE roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(7) NOT NULL DEFAULT '#797979'
);

CREATE TABLE time_windows (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    too_far TINYINT(1) NOT NULL DEFAULT 0,
    min_time INT NOT NULL DEFAULT O,
    max_time INT DEFAULT NULL,
    color VARCHAR(7) NOT NULL DEFAULT "#797979"
);

CREATE TABLE tribunals (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    notes TEXT DEFAULT NULL,
    time_to INT DEFAULT NULL,
    color VARCHAR(7) NOT NULL DEFAULT '#797979',
    group_id INT NOT NULL,
    appeal_court_id INT NOT NULL,
    CONSTRAINT tribunal_group FOREIGN KEY (group_id) REFERENCES `groups` (id),
    CONSTRAINT tribunal_appeal_court FOREIGN KEY (appeal_court_id) REFERENCES `appeal_courts` (id)
);

CREATE TABLE positions (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    placed TINYINT(1) DEFAULT '0' NOT NULL,
    prevalent_domain VARCHAR(5) DEFAULT NULL,
    ranking INT NOT NULL,
    notes TEXT DEFAULT NULL,
    taken TINYINT(1) DEFAULT '0' NOT NULL,
    role_id INT NOT NULL,
    tribunal_id INT NOT NULL,
    CONSTRAINT position_role FOREIGN KEY (role_id) REFERENCES `roles` (id),
    CONSTRAINT position_tribunal FOREIGN KEY (tribunal_id) REFERENCES `tribunals` (id)
);

CREATE TABLE position_tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    tag_id INT NOT NULL,
    position_id INT NOT NULL,
    CONSTRAINT tag FOREIGN KEY (tag_id) REFERENCES tags (id),
    CONSTRAINT position FOREIGN KEY (position_id) REFERENCES positions (id),
    UNIQUE(tag_id, position_id)
);

CREATE TABLE app_state (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    onboarded TINYINT(1) DEFAULT '0' NOT NULL,
    active_filters TEXT DEFAULT NULL
);