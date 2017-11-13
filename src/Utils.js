import path from 'path';

const accentMap = {
    'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u'
};

export function looseStartsWith(str, prefix) {

	if(str && prefix) {

		let aStr = accentFold(str.replace(/\s+/, " ").trim()).toUpperCase()
		let aPref = accentFold(prefix.replace(/\s+/, " ").trim()).toUpperCase();
		
		return aStr.indexOf(aPref) == 0
	}
	
	return false;
}

export function equalsToAny(str, ...args) {

	for (var a in args) {
		let arg = args[a];

		if (looseCompare(str, arg)) {
			return true;
		}
	}

	return false;
}

export function accentFold(s) {
    if (!s) { return ''; }
    var ret = '';
    for (var i = 0; i < s.length; i++) {
        ret += accentMap[s.charAt(i)] || s.charAt(i);
    }
    return ret;
};

export function looseCompare(str1, str2) {

    if (str1 && str2) {
        return accentFold(str1.replace(/\s+/, " ").trim()).toUpperCase()
            == accentFold(str2.replace(/\s+/, " ").trim()).toUpperCase();
    }

    return false;
}
