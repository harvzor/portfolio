var helpers = {
    /**
     * Check if var is object (and not array).
     * @param {*} obj
     */
    isObject: function(obj) {
        if (obj instanceof Array) {
            return false;
        }

        return obj === Object(obj);
    },
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
    onlyUnique: function(value, index, self) {
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
    },
    /**
     * Get the current year.
     */
    getYear: () => {
        return new Date().getUTCFullYear();
    },
    getBlogTags: function(posts) {
        var allTags = [];
        var uniqueTags = [];
        var tagsWithQuantity = [];

        tagsWithQuantity.push({ name: 'all', tag: '', quantity: posts.length });

        for (var i = 0; i < posts.length; i++) {
            allTags = allTags.concat(posts[i].tags);
        }

        uniqueTags = allTags.filter(helpers.onlyUnique);

        for (var i = 0; i < uniqueTags.length; i++) {
            var quantity = allTags.filter(function(tag) {
                return tag == uniqueTags[i];
            }).length;

            tagsWithQuantity.push({ name: uniqueTags[i], tag: uniqueTags[i], quantity: quantity });
        }

        return tagsWithQuantity;
    },
    /**
     * Returns a random integer between min (inclusive) and max (inclusive).
     * The value is no lower than min (or the next integer greater than min
     * if min isn't an integer) and no greater than max (or the next integer
     * lower than max if max isn't an integer).
     * Using Math.round() will give you a non-uniform distribution!
     */
    getRandomInt: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

module.exports = helpers;
