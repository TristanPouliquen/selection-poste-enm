CREATE TABLE tags (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(7) NOT NULL DEFAULT '#cacaca'
);

CREATE TABLE `groups` (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(10) NOT NULL,
    color VARCHAR(7) NOT NULL DEFAULT '#cacaca'
);

CREATE TABLE appeal_courts (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(7) NOT NULL DEFAULT '#cacaca'
);

CREATE TABLE roles (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(7) NOT NULL DEFAULT '#cacaca'
);

CREATE TABLE tribunals (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    color VARCHAR(7) NOT NULL DEFAULT '#cacaca',
    time_to INT DEFAULT NULL,
    group_id INT NOT NULL,
    appeal_court_id INT NOT NULL,
    CONSTRAINT tribunal_group FOREIGN KEY (group_id) REFERENCES `group` (id),
    CONSTRAINT tribunal_appeal_court FOREIGN KEY (appeal_court_id) REFERENCES `appeal_court` (id)
);

CREATE TABLE positions (
    id INT PRIMARY KEY NOT NULL,
    placed TINYINT(1) DEFAULT '0' NOT NULL,
    prevalent_domain VARCHAR(5) DEFAULT NULL,
    ranking INT NOT NULL,
    notes TEXT DEFAULT NULL,
    taken TINYINT(1) DEFAULT '0' NOT NULL,
    role_id INT NOT NULL,
    tribunal_id INT NOT NULL,
    CONSTRAINT position_role FOREIGN KEY (role_id) REFERENCES `role` (id),
    CONSTRAINT position_tribunal FOREIGN KEY (tribunal_id) REFERENCES `tribunal` (id)
);

CREATE TABLE position_tags (
    id INT PRIMARY KEY NOT NULL,
    tag_id INT NOT NULL,
    position_id INT NOT NULL,
    CONSTRAINT tag FOREIGN KEY (tag_id) REFERENCES tag (id),
    CONSTRAINT position FOREIGN KEY (position_id) REFERENCES position (id),
    UNIQUE(tag_id, position_id)
);

CREATE TABLE app_state (
    id INT PRIMARY KEY NOT NULL,
    onboarded TINYINT(1) DEFAULT '0' NOT NULL,
    activeFilters TEXT DEFAULT NULL
);