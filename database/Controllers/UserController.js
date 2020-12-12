//function for travel history
function fillArray(value, len) {
	if (len == 0) return []
	var a = [value]
	while (a.length * 2 <= len) a = a.concat(a)
	if (a.length < len) a = a.concat(a.slice(0, len - a.length))
	return a
}

module.exports = fillArray
