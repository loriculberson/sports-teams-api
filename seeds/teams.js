// const teamsData = require('../data/test_data.csv');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');


const teamsCsv = path.join('data', 'test_data.csv');
const teamsData = [];
let id = 1;
// const teamsData = fs.createReadStream(teamsCsv)
const createTeams = () => {
  fs.createReadStream(teamsCsv)
  .pipe(csv())
  .on('data', function (data) {
//create a team object for each attribute
//push team object into array
    // let id = i;
      const team = new Team(id, data.Team, data.City, data.State, data.Venue, data.League)
    
    teamsData.push(team)
    id++;

  })
  .on('end', function (){

    console.log('hi', teamsData);
  })
  console.log('hi2', teamsData);

}

const teams = createTeams();

//construct a Team object; blueprint
function Team(id, team_name, city, state, venue, sport_league){
  this.id = id;
  this.team_name = team_name;
  this.city = city;
  this.state = state;
  this.venue = venue;
  this.sport_league = sport_league;
}

// createTeams();

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
