// @flow
import knex from './models';

const lowerWhere = (field) => `LOWER(${field}) LIKE ?`;

export async function doSearch(q: string): Promise<Object> {
  const value = [`%${q.toLowerCase()}%`];
  const all = await knex('collectives')
    .whereNull('deletedAt')
    .andWhere((qb) =>
      qb.whereRaw(lowerWhere('name'), value)
        .orWhereRaw(lowerWhere('description'), value)
        .orWhereRaw(lowerWhere('longDescription'), value));
  return all;
}
