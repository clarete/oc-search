// @flow
import Knex from 'knex';
import knexfile from './knexfile';
import { env } from '../config';

const knexConfig = knexfile[env];
const knex = Knex(knexConfig);

export default knex;
