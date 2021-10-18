const _ = require("lodash");
var moment = require('moment-timezone');
moment.tz.setDefault('America/Los_Angeles')

class eventsModel {
    constructor(req) {
        this.req = req;
        this.country = req.query.country == 'all' ? ` ` : ` and tweets.country_code = '${req.query.country}' `;
    }

}

module.exports = eventsModel;
