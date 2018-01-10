// @flow

export const up = async (knex: any) => Promise.all([
  await knex.schema.createTable('collectives', (table) => {
    table.charset('utf8'); // Specific for the MySQL backend
    table.integer('id').primary();
    table.string('name').notNullable(); // Couldn't be unique because of libpostal
    table.string('description');
    table.string('currency').notNullable();
    table.datetime('createdAt');
    table.datetime('updatedAt');
    table.datetime('deletedAt');
    table.boolean('isActive');
    table.text('longDescription');
    table.string('image');
    table.string('slug');
    table.string('website');
    table.string('twitterHandle');
    table.string('mission');
    table.string('backgroundImage');
    table.string('tags');
    table.boolean('isSupercollective');
    table.string('type');
    table.json('data');
  }),
]);

export const down = (knex: any) =>
  knex.schema.dropTable('collectives');
