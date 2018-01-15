import { combineReducers } from 'redux';
import accounts from './accounts';
import db from './db';
import tweets from './tweets';

const reducers = combineReducers({ accounts, db, tweets });

export default reducers
