CREATE TABLE
  services (
    id serial PRIMARY KEY,
    name varchar(50),
    url text,
    strategy varchar(16)
  )

CREATE TABLE
  service_owners (
    id serial PRIMARY KEY,
    name varchar(50),
    users_id integer REFERENCES auth.users(id),
    services_id integer REFERENCES services(id)
  )

CREATE TABLE
  status_history (
    id serial PRIMARY KEY,
    services_id integer REFERENCES services(id),
    healthy boolean,
    time timestamp DEFAULT CURRENT_TIMESTAMP
  )
