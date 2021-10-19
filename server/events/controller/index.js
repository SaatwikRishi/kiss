var moment = require('moment-timezone');
moment.tz.setDefault('America/Los_Angeles')
var _ = require('lodash');

var eventsController = {
  getAllEvents: async (req, res) => {
    try {    
      let result = await req.db.query('SELECT * FROM tbl_events ORDER BY event_date DESC','getAllEvents');     
      res.json({result})
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  saveCategory: async (req, res) => {
    try {    
      let {data} = req.body;
      console.log(data);
      let category_json = JSON.stringify(data.category_json);
      let queries={
        category:((data.catid)?`UPDATE tbl_categories SET name='${data.name}', description='${data.description}', category_json='${category_json}'  WHERE catid='${data.catid}'`:`INSERT INTO tbl_categories ( name, description, category_json ) VALUES ('${data.name}',  '${data.description}',  '${category_json}')`),
      }  
      let result = await req.db.query(queries.category,'saveCategory'); 
      console.log(result);    
      res.json({result})
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  getAllCategories: async (req, res) => {
    try {    
      let result = await req.db.query('SELECT * FROM tbl_categories ORDER BY name ASC','getAllCategories'); 
      console.log(result);    
      res.json({result})
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },

}

module.exports = eventsController;