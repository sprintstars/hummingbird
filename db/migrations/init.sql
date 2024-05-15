CREATE TABLE
  services (
    id serial PRIMARY KEY,
    name varchar(50),
    url text,
    strategy varchar(16)
  )

CREATE TABLE
  status_history (
    id serial PRIMARY KEY,
    service_id integer FOREIGN KEY,
    healthy boolean,
    time timestamp DEFAULT CURRENT_TIMESTAMP
  )
