#!/bin/sh
cd $(dirname $0)/..
npx sequelize-cli db:migrate
