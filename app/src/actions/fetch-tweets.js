import * as Constants from '../constants';

export default function (userId) {
  return async (dispatch, getState) => {
    const { db } = getState();
    const response = await db.ref(`/tweets/${userId}/`)
      .orderByChild('year')
      .equalTo('2018')
      .once('value')

    dispatch({ type: Constants.TWEETS, data: Object.values(response.val() || {}) });
  };
};
