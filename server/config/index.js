// @flow
import fullConfig from './config.json';

export const env = process.env.NODE_ENV || 'development';
const config = fullConfig[env];
export default config;
