export default function (tweets) {
  const headers = Object.keys(tweets[0]).sort();
  const rows = tweets.map(tweet => {
    return ordered(headers, {...tweet, text: csvString(tweet.text), created_at: csvDate(tweet.created_at)})
  });

  return [headers.join(','), ...rows].join('\n');
}

function ordered (headers, item) {
  return headers.map(header => item[header]).join(',');
}

const months = {
	'Jan': '01',
	'Feb': '02',
	'Mar': '03',
	'Apr': '04',
	'May': '05',
	'Jun': '06',
	'Jul': '07',
	'Aug': '08',
	'Sep': '09',
	'Oct': '10',
	'Nov': '11',
	'Dec': '12'
}

function csvString (text) {
  return text.replace(/,/g, '').replace(/\n/g, '');
}

function csvDate (dateString) {
  var list = dateString.split(' ');
  return months[list[1]] + '-' + list[2] + '-' + list[5] + ' ' + list[3];
}
