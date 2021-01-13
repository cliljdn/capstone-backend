module.exports = {
	//function for travel history
	fillArray: function (value, len) {
		if (len == 0) return []
		var a = [value]
		while (a.length * 2 <= len) a = a.concat(a)
		if (a.length < len) a = a.concat(a.slice(0, len - a.length))
		return a
	},

	removeDuplicates: function (arr) {
		let temp_dataList = arr.map((item) => {
			return [item.batch, item]
		}) // creates array of array

		let temp_mapArr = new Map(temp_dataList) // create key value pair from array of array

		const result = [...temp_mapArr.values()] //converting back to array from mapobject
		return result
	},
}
