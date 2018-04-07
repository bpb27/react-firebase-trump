import { combineReducers } from 'redux';
import app from './app';
import db from './db';
import searchOptions from './search-options';
import tweets from './tweets';

const reducers = combineReducers({ app, db, searchOptions, tweets });

export default reducers
