import { Express } from "express";
import * as mongoose from 'mongoose';
const express = require('express');

//Routes
import api from './routes/api';

const app: Express = express();

app.use('/', express.static(__dirname + '/public'));

app.use('/api', api);

export default app;