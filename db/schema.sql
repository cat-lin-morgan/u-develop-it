CREATE TABLE parties (
  id INTEGER PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT
);
CREATE TABLE candidates (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    industry_connected BOOLEAN NOT NULL
    party_id INTEGER UNSIGNED,
    CONSTRAINT fk_party FORGEIN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
);


-- DELETE FROM candidates WHERE id > 15;