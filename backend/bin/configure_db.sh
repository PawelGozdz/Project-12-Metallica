#!/bin/bash

echo "Configuring metallicadb"

dropdb -U metallica_user metallicadb
createdb -U metallica_user metallicadb

bash -c "psql -U metallica_user metallicadb < ./bin/sql/db_text.sql"

echo "metallicadb configured!"

sleep 10