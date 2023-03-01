CREATE TABLE documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    size INTEGER NOT NULL,
    position_id INTEGER NOT NULL,
    CONSTRAINT position_document FOREIGN KEY (position_id) REFERENCES positions (id)
);