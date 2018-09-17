const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const teamsCsv = path.join('data', 'sports_teams.csv');

const createTeams = () => {
  return new Promise((resolve) => {
    const allTeams = [];
    fs.createReadStream(teamsCsv)
    .pipe(csv())
    .on('data', (data) => {
        const team = new Team(data.Team, data.City, data.State, data.Venue, data.League)
        allTeams.push(team)
    })
    .on('end', () => {
      resolve(allTeams);
    })
  })
}

function Team(team_name, city, state, venue, sport_league){
  this.team_name = team_name;
  this.city = city;
  this.state = state;
  this.venue = venue;
  this.sport_league = sport_league;
}

exports.seed = function(knex, Promise) {
  return knex('teams')
    .del()
    .then(()=> {
      return createTeams()
    })
    .then((sportsTeams) => {
      return knex.insert(sportsTeams).into('teams')
    })
    .then(() => console.log('Teams added!'))
};
