import { combineReducers } from 'redux';
import app from './app';
import db from './db';
import tweets from './tweets';

const reducers = combineReducers({ app, db, tweets });

export default reducers
