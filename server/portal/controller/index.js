var loginModel = require('../model/login');

const portalController = {
  login: async (req, res, next) => {
    try {
      let result = await loginModel.procesLogin(req, res);
      res.json({result});
    } catch (error) {
      res.json({error: error.stack});
    }
  },
  logout: async (req, res, next) => {
    try {
      res.cookie('user', null, {
        maxAge: 7 * 24 * 30 * 365 * 1000,
        httpOnly: true,
      });
      res.json({result: 'logout success'});
    } catch (error) {
      res.json({error: error.stack});
    }
  },

  /**
   * 
   * @param {import('express').Request} req 
   * @param {*} res 
   * @param {*} next 
   */
  getUser: async (req, res, next) => {
    try {
        
      console.log('Getting User');
      console.log(req.cookies.temp);
      let user = req.cookies['user'];
      let result = user;
      if (user === 'j:null') {
        result = null;
      }
      res.json({result});
    } catch (error) {
      console.error(error);
      res.json({
        result: {redirect: true},
      });
    }
  },
  getComments: async (req, res, next) => {
    try {
      let id = req.params.id;
      let query = `SELECT evnt.eventid, comm.com_text, comm.com_date, stud.firstname, stud.lastname from tbl_comments  comm left join tbl_students stud on comm.student_id=stud.studentid left join tbl_events evnt on comm.event_id=evnt.eventid WHERE  comm.event_id=${id} and comm.status='1'`;
      let result = await req.db.query(query, 'getComments-' + id);
      res.json({result});
    } catch (error) {
      console.error(error);
      res.json({
        result: {redirect: true},
      });
    }
  },
  addComments: async (req, res, next) => {
    try {
      let {event_id, student_id, com_text, com_date} = req.body;
      let query = `INSERT INTO tbl_comments (event_id, student_id, com_text, com_date) VALUES (${event_id},${student_id},'${com_text.replace(
        /'/g,
        ''
      )}','${com_date}');`;
      let result = await req.db.query(query, 'addComments-' + event_id);
      res.json({result});
    } catch (error) {
      console.error(error);
      res.json({error});
    }
  },
};

module.exports = portalController;
