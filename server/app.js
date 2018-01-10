// @flow
import express from 'express';
import morgan from 'morgan';
import * as controllers from './controllers';

const app = express();
app.use(morgan('combined'));
app.get('/', controllers.index);
app.get('/search', controllers.search);

export default app;
