var moment = require('moment-timezone');
moment.tz.setDefault('America/Los_Angeles')
var _ = require('lodash');

var eventsController = {
  testEvents: async (req, res) => {
    try {    
      let result = await req.db.query('SELECT * FROM tbl_events ORDER BY event_date DESC','testEvents');     
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
        category:((data.catid!='')?`UPDATE tbl_categories SET name='${data.name}', description='${data.description}', category_json='${category_json}'  WHERE catid='${data.catid}'`:`INSERT INTO tbl_categories ( name, description, category_json ) VALUES ('${data.name}',  '${data.description}',  '${category_json}')`),
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
      //console.log(result);    
      res.json({result})
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  saveEvents: async (req, res) => {
    try {    
      let {data} = req.body;
      console.log(data);
      let event_json = JSON.stringify(data.event_json);
      let category_json = JSON.stringify(data.category_json);
      let start_date = data.end_date ? (data.end_date[0] ? moment(data.end_date[0]).format('YYYY-MM-DD'):'') : '';
      let end_date = data.end_date ? (data.end_date[1] ? moment(data.end_date[1]).format('YYYY-MM-DD'):'') : '';
      let apply_date = data.apply_date ? moment(data.apply_date).format('YYYY-MM-DD'): '';

      let queries={
        category:((data.eventid)?`UPDATE tbl_events SET event_name='${data.event_name}', event_desc='${data.event_desc}', start_date='${start_date}', end_date='${end_date}', apply_date='${apply_date}', catid='${data.catid}', category_json='${category_json}', event_json='${event_json}', document_url='${data.document_url}', tags='${data.tags}'  WHERE eventid='${data.eventid}'`:`INSERT INTO tbl_events ( event_name, event_desc, start_date, end_date, apply_date, catid, category_json, event_json, document_url, tags ) VALUES ('${data.event_name}', '${data.event_desc}', '${start_date}', '${end_date}', '${apply_date}', '${data.catid}', '${category_json}', '${event_json}', '${data.document_url}', '${data.tags}')`),
      }  
      console.log(queries.category);
      let result = await req.db.query(queries.category,'saveEvents'); 
      console.log(result);    
      res.json({result})
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  getAllEvents: async (req, res) => {
    try {    
      let result = await req.db.query('SELECT * FROM tbl_events ORDER BY end_date DESC','getAllEvents'); 
      console.log(result);    
      res.json({result})
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  getCategory: async (req, res) => {
    try {    
      let {catid} = req.body;
      let result = await req.db.query(`SELECT * FROM tbl_categories WHERE catid = '${catid}'`,'getCategory'); 
      console.log(result);    
      res.json({result})
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  getEvent: async (req, res) => {
    try {    
      let {eventid} = req.body;
      let result = await req.db.query(`SELECT * FROM tbl_events WHERE catid = '${eventid}'`,'getEvent'); 
      console.log(result);    
      res.json({result})
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  saveStudentCategory: async (req, res) => {
    try {    
      let {data} = req.body;
      let updateField = '';
      Object.keys(data).forEach(key => {  
        updateField += `${key} = '${(key=='studentcat_json')?JSON.stringify(data[key]):data[key]}', `
      });
      updateField = updateField.substr(0, updateField.length-2);
      let queries={
        category:((data.stdcatid)?`UPDATE tbl_student_categories SET ${updateField}  WHERE stdcatid='${data.stdcatid}'`:`INSERT INTO tbl_student_categories SET ${updateField}`),
      }  
      let result = await req.db.query(queries.category,'saveStudentCategory'); 
      console.log(result);    
      res.json({result})
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  getAllStdCategories: async (req, res) => {
    try {    
      let result = await req.db.query('SELECT * FROM tbl_student_categories ORDER BY name ASC','getAllStdCategories'); 
      //console.log(result);    
      res.json({result})
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  saveStudentProfile: async (req, res) => {
    try {    
      let {data} = req.body;
      //console.log(data);

      let updateField = '';
      Object.keys(data).forEach(key => {  
        updateField += `${key} = '${(key=='student_json')?JSON.stringify(data[key]):data[key]}', `
      });
      updateField = updateField.substr(0, updateField.length-2);
      let queries={
        category:((data.studentid)?`UPDATE tbl_students SET ${updateField} WHERE studentid='${data.studentid}'`:`INSERT INTO tbl_students SET ${updateField}`),
      }  
      let result = await req.db.query(queries.category,'saveStudentProfile'); 
      console.log(queries.category);    
      res.json({result})
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  getAllStudents: async (req, res) => {
    try {    
      let result = await req.db.query('SELECT * FROM tbl_students ORDER BY firstname ASC','getAllStudents'); 
      //console.log(result);    
      res.json({result})
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
}

module.exports = eventsController;