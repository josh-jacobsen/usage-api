#!/bin/bash

sleep 10

mongoimport --drop --host mongo_db --username username --password password --authenticationDatabase admin --db billing --collection customers --type json --jsonArray --file /seed-data/customers.json

mongoimport --drop --host mongo_db --username username --password password --authenticationDatabase admin --db billing --collection usage --type json --jsonArray --file /seed-data/usage.json
