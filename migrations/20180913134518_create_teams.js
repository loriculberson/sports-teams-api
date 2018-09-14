exports.up = function(knex, Promise) {
  return knex.schema.hasTable('teams').then(exists => {
      if (!exists) {
          return knex.schema.createTable('teams', table => {
              table.increments('id').primary(); 
              table.string('team_name').notNullable();
              table.string('city').notNullable();
              table.string('state').notNullable();
              table.string('venue').notNullable();
              table.string('sport_league').notNullable();
              table.timestamps(true, true);
          });
      }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('teams');
};