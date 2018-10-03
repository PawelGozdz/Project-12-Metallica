#!/bin/bash

echo "Konfiguruję metallicadb"

dropdb -U metallica_user metallicadb
createdb -U metallica_user metallicadb

bash -c "psql -U metallica_user metallicadb < ./bin/sql/db_text.sql"

echo "Skonfigurowano metallicadb"

sleep 3