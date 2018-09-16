// const teamsData = require('../data/test_data.csv');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const teamsCsv = path.join('data', 'test_data.csv');
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

createTeams().then((teamsData) => {
  console.log('hi', teamsData);
});
//construct a Team object; blueprint
function Team(team_name, city, state, venue, sport_league){
  this.team_name = team_name;
  this.city = city;
  this.state = state;
  this.venue = venue;
  this.sport_league = sport_league;
}


// exports.seed = function(knex, Promise) {
//   return knex('teams')
//     .del()
//     .then(function () {
//       return knex('teams').insert([
//         { id: index+1,
//           team_name: data.team_name,
//           city: data.city,
//           state: data.state,
//           venue: data.venue,
//           sport_league: data.sport_league
//         },

//       ]);
//     });
//     console.log('Teams Added!');
// };
