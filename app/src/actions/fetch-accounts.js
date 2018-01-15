import * as Constants from '../constants';

export default function () {
  return (dispatch, getState) => {

    const { accounts, db } = getState();
    if (accounts.length) return;

    db.ref('/accounts').once('value').then((snapshot) => {
      const data = snapshot.val();
      dispatch({type: Constants.ACCOUNTS, data});
    });

  };
};
