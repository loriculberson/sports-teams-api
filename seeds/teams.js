// const teamsData = require('../data/test_data.csv');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const teamsCsv = path.join('data', 'sports_teams.csv');
// const teamsData = fs.createReadStream(teamsCsv)
const createTeams = () => {
  return new Promise((resolve) => {
    const allTeams = [];
    fs.createReadStream(teamsCsv)
    .pipe(csv())
    .on('data', (data) => {
      //.on adds the event listener
      //'data' is the event
      //function(data) is the callback function
        const team = new Team(data.Team, data.City, data.State, data.Venue, data.League)
        allTeams.push(team)
        // console.log(allTeams);
    })
    .on('end', () => {
      //resolve the promise with teamsData
      resolve(allTeams);
    })
  })
}


// createTeams() returns a Promise. See line 9
//the Promise constructor takes a function and that function takes two arguments which are both functions called ==> resolve and reject
//resolve is a function that takes an argument that can be any type of data (like an array)

//resolve = (teamsData) => {
  // console.log(teamsData);
// }


//construct a Team object; blueprint
function Team(team_name, city, state, venue, sport_league){
  this.team_name = team_name;
  this.city = city;
  this.state = state;
  this.venue = venue;
  this.sport_league = sport_league;
}

exports.seed = function(knex, Promise) {
  return createTeams().then((sportsTeams) => {
    return knex('teams')
    .del()
    .then(()=> {
      return knex.insert(sportsTeams).into('teams');
    })
    .then(() => console.log('Teams added!'))
  })
};
