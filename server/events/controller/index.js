var moment = require('moment-timezone');
moment.tz.setDefault('Asia/Kolkata')
var _ = require('lodash');
var nodemailer = require('nodemailer');

var crypto = require("crypto");
var algorithm = "aes-192-cbc"; //algorithm to use
var passwordkey = "PASSWORD";
const passkey = crypto.scryptSync(passwordkey, 'salt', 24); //create key

var eventsController = {
  testEvents: async (req, res) => {
    try {
      let result = await req.db.query('SELECT * FROM tbl_events ORDER BY event_date DESC', 'testEvents');
      res.json({ result })
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  saveCategory: async (req, res) => {
    try {
      let { data } = req.body;
      let updateField = '';
      Object.keys(data).forEach(key => {
        updateField += `${key} = '${(key == 'category_json') ? JSON.stringify(data[key]) : data[key]}', `
      });
      updateField = updateField.substr(0, updateField.length - 2);
      let queries = {
        category: ((data.catid) ? `UPDATE tbl_categories SET ${updateField} WHERE catid='${data.catid}'` : `INSERT INTO tbl_categories SET ${updateField}`),
      }
      let result = await req.db.query(queries.category, 'saveCategory');
      console.log(queries.category);
      res.json({ result })
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  getAllCategories: async (req, res) => {
    try {
      let result = await req.db.query('SELECT * FROM tbl_categories ORDER BY name ASC', 'getAllCategories');
      //console.log(result);    
      res.json({ result })
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  saveEvents: async (req, res) => {
    try {
      let { data } = req.body;
      console.log(data);

      let updateField = '';
      Object.keys(data).forEach(key => {
        if ((key == 'event_json' || key == 'category_json') && data[key]) {
          updateField += `${key} = '${JSON.stringify(data[key])}', `
        } else if ((key == 'end_date') && data[key]) {
          if (data[key][0]) {
            updateField += `start_date = '${moment(data[key][0]).format('YYYY-MM-DD')}', `
          }
          if (data[key][1]) {
            updateField += `${key} = '${moment(data[key][1]).format('YYYY-MM-DD')}', `
          }
        } else if ((key == 'apply_date') && data[key]) {
          updateField += `${key} = '${moment(data[key]).format('YYYY-MM-DD')}', `
        } else {
          updateField += `${key} = '${(key == 'student_json') ? JSON.stringify(data[key]) : data[key]}', `
        }
      });
      updateField = updateField.substr(0, updateField.length - 2);

      let queries = {
        category: ((data.eventid) ? `UPDATE tbl_events SET ${updateField} WHERE eventid='${data.eventid}'` : `INSERT INTO tbl_events SET ${updateField}`),
      }
      console.log(queries.category);
      let result = await req.db.query(queries.category, 'saveEvents');
      console.log(result);
      res.json({ result })
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  getAllEvents: async (req, res) => {
    try {
      let result = await req.db.query('SELECT * FROM tbl_events ORDER BY end_date DESC', 'getAllEvents');
      console.log(result);
      res.json({ result })
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  getCategory: async (req, res) => {
    try {
      let { catid } = req.body;
      let result = await req.db.query(`SELECT * FROM tbl_categories WHERE catid = '${catid}'`, 'getCategory');
      console.log(result);
      res.json({ result })
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  getEvent: async (req, res) => {
    try {
      let { data } = req.body;
      let result = await req.db.query(`SELECT * FROM tbl_events WHERE eventid = '${data}'`, 'getEvent');
      console.log(result);
      res.json({ result })
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  saveStudentCategory: async (req, res) => {
    try {
      let { data } = req.body;
      let updateField = '';
      Object.keys(data).forEach(key => {
        updateField += `${key} = '${(key == 'studentcat_json') ? JSON.stringify(data[key]) : data[key]}', `
      });
      updateField = updateField.substr(0, updateField.length - 2);
      let queries = {
        category: ((data.stdcatid) ? `UPDATE tbl_student_categories SET ${updateField}  WHERE stdcatid='${data.stdcatid}'` : `INSERT INTO tbl_student_categories SET ${updateField}`),
      }
      let result = await req.db.query(queries.category, 'saveStudentCategory');
      console.log(result);
      res.json({ result })
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  getAllStdCategories: async (req, res) => {
    var text = "this is the text to be encrypted"; //text to be encrypted

    try {
      let result = await req.db.query('SELECT * FROM tbl_student_categories ORDER BY name ASC', 'getAllStdCategories');
      //console.log(result);    
      res.json({ result })
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  saveStudentProfile: async (req, res) => {
    try {
      let { data } = req.body;
      console.log(process.env.name);

      let updateField = '';
      Object.keys(data).forEach(key => {
        if (key == 'password' && data[key]) {
          updateField += `${key} = '${loginModel.encrypt(data[key])}', `
        }
        else {
          updateField += `${key} = '${(key == 'student_json') ? JSON.stringify(data[key]) : data[key]}', `
        }
      });
      updateField = updateField.substr(0, updateField.length - 2);
      let queries = {
        category: ((data.studentid) ? `UPDATE tbl_students SET ${updateField} WHERE studentid='${data.studentid}'` : `INSERT INTO tbl_students SET ${updateField}`),
      }
      let result = await req.db.query(queries.category, 'saveStudentProfile');
      console.log(queries.category);

      if(!data.studentid)
      {
        /* mail function start */
        var from = process.env.user;
        var subjectcontent = process.env.subject.replace('<name>',data.firstname);
        var msgcontent1 = process.env.message1.replace('<name>',data.firstname);
        var msgcontent2 = process.env.message2;
        var msgcontent3 = process.env.message3;
        var msgcontent4 = process.env.message4.replace('<user>',data.email);
        var msgcontent5 = process.env.message5.replace('<pass>',data.password);
        var message = msgcontent1+'\n\n'+msgcontent2+'\n\n'+msgcontent3+'\n\n'+msgcontent4+'\n'+msgcontent5;
        var to = data.email;
        let transporter = nodemailer.createTransport({
          host: process.env.host,
          port: 587,
          secure: false,
          auth: {
            user: process.env.user,
            pass: process.env.pass
          },
        });
          
        var mailOptions = {
            from: from,
            to: to, 
            subject: subjectcontent,
            text: message,
            html: message
        }
        transporter.sendMail(mailOptions, function(error, response){
            if(error){
              res.json({ error: error.toString() })
            }else{
              res.json({result})
            }
        });
        /* mail function start */
      }      
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  getAllStudents: async (req, res) => {
    try {
      let result = await req.db.query('SELECT * FROM tbl_students ORDER BY firstname ASC', 'getAllStudents');
      //console.log(result);    
      res.json({ result })
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  saveTag: async (req, res) => {
    try {
      let { data } = req.body;
      let updateField = '';
      if (!data.tagid) {
        data.tag.forEach(val => {
          console.log(val.name);
          if (val.name) {
            updateField += ` ('${val.name}'), `
          }
        });
      }
      updateField = updateField.substr(0, updateField.length - 2);
      let queries = {
        tags: ((data.tagid) ? `UPDATE tbl_tags SET ${updateField} WHERE tagid='${data.tagid}'` : `INSERT INTO tbl_tags (tag) VALUES ${updateField}`),
      }
      let result = await req.db.query(queries.tags, 'saveTag');
      console.log(queries.tags);
      res.json({ result })
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  getAllTags: async (req, res) => {
    try {
      let result = await req.db.query('SELECT * FROM tbl_tags', 'getAllTags');
      //console.log(result);    
      res.json({ result })
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  getStudentByTag: async (req, res) => {
    try {
      let { tags } = req.body;
      console.log(tags);
      let result = await req.db.query(`SELECT email FROM tbl_students WHERE tag = '${tags}'`, 'getEvent');
      console.log(result);
      res.json({ result })
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  sendNotification: async (req, res) => {
    try {
      let { data, stdEmails } = req.body;

      if (stdEmails.length > 0) {
        stdEmails.forEach(val => {
          if (val) {
            console.log(val);
            /* mail function start */
            var from = process.env.user;
            var subject = data.title;
            var message = data.message;
            var to = val;
            let transporter = nodemailer.createTransport({
              host: process.env.host,
              port: 587,
              secure: false,
              auth: {
                user: process.env.user,
                pass: process.env.pass
              },
            });

            var mailOptions = {
              from: from,
              to: to,
              subject: subject,
              text: message,
              html: message
            }
            transporter.sendMail(mailOptions, function (error, response) { });
            /* mail function start */
          }
        });
      }
      await eventsController.sleep(20 * 1000);
      res.json({ result: 'success' })
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  saveStudentEventForm: async (req, res) => {
    try {
      let { data } = req.body;
      console.log(data);
      let updateField = `eventid = '${data.eventid}', studentid = '${data.studentid}', created_date = '${(data.created_date) ? moment(data.created_date).format('YYYY-MM_DD') : ''}', form_json = '${(data.form_json) ? JSON.stringify(data.form_json) : ''}' `
      let queries = {
        category: `INSERT INTO tbl_student_forms SET ${updateField}`,
      }
      let result = await req.db.query(queries.category, 'saveStudentEventForm');
      console.log(result);
      res.json({ result })
    }
    catch (ex) {
      res.json({ error: ex.toString() })
    }
  },
  sleep: async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
}

module.exports = eventsController;