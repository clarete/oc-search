// @flow
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import * as controllers from './controllers';

const app = express();
app.use(morgan('combined'));
app.use('/', express.static(path.join(__dirname, '..', 'client')));
app.get('/search', controllers.search);

export default app;
