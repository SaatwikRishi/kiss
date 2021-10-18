var moment = require('moment-timezone');
moment.tz.setDefault('America/Los_Angeles')
var _ = require('lodash');



var eventsController = {
  getEvents: async (req, res) => {
    try {
      let { env } = process     
      let result ='success'      
      res.json({result})

    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },

}

module.exports = eventsController;