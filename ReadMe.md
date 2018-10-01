# Sports Teams API

## Set Up
```
brew install postgres
npm install -g knex
brew services start postgresql
createdb sports_teams
```

## Install packages
`npm install`

## To Run Migration
`knex migrate:latest`

## To Seed the Database
`knex seed:run`

## Endpoints 

### GET


**All Teams**

`/api/teams`

**By Team**

`/api/teams/:id`

**By Sport League**

`/api/teams/league/:sportLeague`

`:sportLeague` includes: MLB, NBA, NFL, NHL

**By State**

`/api/state/:stateName`
States are case agnostic.

**By State and Sport League**

`/api/state/:stateName/:sportLeague`

### PUT
`/api/teams/:id`

### POST
`/api/teams`

### DELETE
`/api/teams/:id`


**Resources:**
[Data source: radavid 2013](https://github.com/radavis/gametoday/blob/master/db/teams.csv)

