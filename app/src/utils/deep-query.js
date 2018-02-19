
export function deepQueryObject (query) {
  if (symbolsPresent(query)) {
    return createDeepQueryObject(query);
  } else {
    return {};
  }
}

export function deepQueryParse (deepQuery, text) {

  if (deepQuery['and'].length && deepQuery['not'].length) {
    return parseAndMatch(deepQuery, text) && parseNotMatch(deepQuery, text);
  }

  if (deepQuery['and'].length) {
    return parseAndMatch(deepQuery, text);
	}

  if (deepQuery['or'].length && deepQuery['not'].length) {
    return parseOrMatch(deepQuery, text) && parseNotMatch(deepQuery, text);
  }

  if (deepQuery['or'].length) {
    return parseOrMatch(deepQuery, text);
  }

	if (deepQuery['not'].length) {
		return parseNotMatch(deepQuery, text);
	}

  return true;
}

function isWordInText (word='', text='') {
  return text.toLowerCase().includes(word.toLowerCase());
}

function parseAndMatch (deepQuery, text) {
  return deepQuery['and'].filter(word => isWordInText(word, text)).length === deepQuery['and'].length;
}

function parseOrMatch (deepQuery, text) {
  return deepQuery['or'].filter(word => isWordInText(word, text)).length > 0;
}

function parseNotMatch (deepQuery, text) {
  return deepQuery['not'].filter(word => isWordInText(word, text)).length === 0;
}

function symbolsPresent (str) {
  return str.includes('&&') || str.includes('||') || str.includes('~~');
}

function createDeepQueryObject (str) {
	str = andor(str)[1] + str;

	const hash = { 'and': [], 'or': [], 'not': [] };
	let symbol = andor(str)[0];
	let marker = 0;

	for (let i = 0; i < str.length; i++) {
		if (str[i] === '&' && str[i + 1] === '&') {
			step(i);
			symbol = 'and';
		} else if (str[i] === '|' && str[i + 1] === '|') {
			step(i);
			symbol = 'or';
		} else if (str[i] === '~' && str[i + 1] === '~') {
			step(i);
			symbol = 'not';
		} else if (i === str.length - 1) {
			step(i);
		}
	}

	hash['and'] = clean(hash['and']);
	hash['or'] = clean(hash['or']);
	hash['not'] = clean(hash['not']);

	function andor (str) {
		const or = ['or', '||'];
		const and = ['and', '&&'];

		if (str.indexOf('||') !== -1) {
			if (str.indexOf('&&') !== -1) {
				if (str.indexOf('||') < str.indexOf('&&')) {
					return or;
				} else {
					return and;
				}
			} else {
				return or;
			}
		} else {
			return and;
		}
	}

	function clean (list) {
		return list.map(item => item.replace(/[|&~]/g, '').trim()).filter(i => i);
	}

	function step (i) {
		hash[symbol].push(str.slice(marker, i + 1));
		marker = i + 1;
	}

	return hash;
}
