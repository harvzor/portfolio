var helpers = {
	// A general way for rendering dates on the front end.
	friendlyDate: function(d) {
		var date = new Date(d);
		return helpers.getOrdinal(date.getDate())
			+ " " + helpers.getMonth(date.getMonth())
			+ " " + date.getFullYear();
	},
	// Gets an ordinal ("th", "st", "nd" or "rd") from a number and returns 
	// the original number as well as the ordinal.
	// https://gist.github.com/jlbruno/1535691
	getOrdinal: function(n) {
		var s = ["th","st","nd","rd"],
			v = n % 100;

		return n + (s[(v-20) % 10] || s[v] || s[0]);
	},
	// Filters an array by unique values.
	// http://stackoverflow.com/questions/1960473/unique-values-in-an-array
	function onlyUnique(value, index, self) { 
		return self.indexOf(value) === index;
	},
	// Gets a month from a digit.
	// i = 0 - 11
	// return a month
	getMonth: function(i) {
		switch(i) {
			case 0:
				return "January";
			break;
			case 1:
				return "February";
			break;
			case 2:
				return "March";
			break;
			case 3:
				return "April";
			break;
			case 4:
				return "May";
			break;
			case 5:
				return "June";
			break;
			case 6:
				return "July";
			break;
			case 7:
				return "August";
			break;
			case 8:
				return "September";
			break;
			case 9:
				return "October";
			break;
			case 10:
				return "November";
			break;
			case 11:
				return "December";
			break;
		}
	}
};

module.exports = helpers;

