// @flow

import parse from 'csv-parse';
import fs from 'fs';
import knex from '../models';

// Helpers for converting CSV data to JavaScript values
const toDate = (value: string|null): Date|null =>
  (value ? new Date(value) : null);
const toBool = (value: string): boolean =>
  value === 'TRUE';
const toInt = (value: string): number =>
  parseInt(value, 10);

const tableIsEmpty = async (): Promise<boolean> => {
  const [ { count } ] = await knex('collectives').count('id as count');
  return count === 0;
}

// Callback to be executed when the CSV stream reader emits data
const parser = parse({ columns: true }, async (err, data) => {
  await knex('collectives').insert(data.map((i) => ({
    ...i,
    id: toInt(i.id),
    createdAt: toDate(i.createdAt),
    updatedAt: toDate(i.updatedAt),
    deletedAt: toDate(i.deletedAt),
    isActive: toBool(i.isActive),
    isSupercollective: toBool(i.isSupercollective),
  })));
  knex.destroy();
});

// Read the command line argument & kick off the stream reader
function main() {
  if (process.argv.length === 3) {
    tableIsEmpty().then((isEmpty) => {
      if (isEmpty) {
        fs.createReadStream(process.argv[2]).pipe(parser);
      } else {
        knex.destroy(); // Avoid hanging on exit
      }
    });
  } else {
    // eslint-disable-next-line no-console
    console.error(`Usage: ${process.argv[0]} <CSV-FILE>`);
    knex.destroy(); // Avoid hanging on exit
  }
}

main();
