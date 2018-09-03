import * as Constants from '../constants';

const tweets = (state = [], action) => {
  if (action.type === Constants.TWEETS) {
    return unique([...state, ...action.data]).sort(sorting);
  }
  return state;
}

export default tweets

const sorting = (a, b) => new Date(b.created_at) - new Date(a.created_at);

function unique (list) {
  const newList = [];
  const hash = {};
  for (let i = 0; i < list.length; i++) {
    if (!hash[list[i].id_str]) {
      hash[list[i].id_str] = true;
      newList.push(list[i]);
    }
  }
  return newList;
}
