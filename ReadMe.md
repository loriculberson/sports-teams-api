### Sports Teams API

#### Set Up
`brew install postgres`
`npm install -g knex`

`brew services start postgresql`
`createdb <name of db>`

#### To Run Migration
`knex migrate:latest`

#### To Seed the Database
`knex seed:run`

#### API Endpoints
GET
* all US sports teams
* all NFL teams
* all MLB teams
* all NBA teams

Data from 2013 courtesy of: https://github.com/radavis/gametoday/blob/master/db/teams.csv

