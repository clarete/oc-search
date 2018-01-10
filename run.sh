#!/bin/sh

export APP=/usr/src/app
export JSBIN=$APP/node_modules/.bin/
export PATH=$PATH:$JSBIN

echo 'Create database'
until mysql --user=root --password=foo --host=mysql \
      --execute='create database if not exists opencollective'; do
  >&2 echo "DB is unavailable - sleeping"
  sleep 1
done

echo 'Initial migration'
$JSBIN/babel-node $JSBIN/knex --cwd ./server/models migrate:latest

echo 'Import data'
$JSBIN/babel-node $APP/server/tools/importData $APP/data/data.csv

echo 'Run application'
npm start
