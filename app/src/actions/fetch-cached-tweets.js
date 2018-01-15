import axios from 'axios';
import * as Constants from '../constants';

export default function (username) {
  return async (dispatch, getState) => {

    const baseUrl = 'https://d5nxcu7vtzvay.cloudfront.net/data/' + username + '/';
    const response = await Promise.all([
      axios.get(baseUrl + '2009.json'),
      axios.get(baseUrl + '2010.json'),
      axios.get(baseUrl + '2011.json'),
      axios.get(baseUrl + '2012.json'),
      axios.get(baseUrl + '2013.json'),
      axios.get(baseUrl + '2014.json'),
      axios.get(baseUrl + '2015.json'),
      axios.get(baseUrl + '2016.json'),
      axios.get(baseUrl + '2017.json'),
    ]);

    const cachedTweets = response.reduce((set, year) => {
      return [...set, ...year.data];
    }, []);

    dispatch({ type: Constants.TWEETS, data: cachedTweets });

  };
};
