var express = require('express');
var router = express.Router();
const portalController = require("../controller");
const { exec } = require("child_process");

/* GET home page. */
router.post('/api/login', portalController.login)
router.get('/api/logout', portalController.logout)
router.get('/api/getUser', portalController.getUser)



router.post('/api/deploy', async (req, res, next) => {
    
    try {
        let result={}
        exec("cd /var/www/nodeapps/Team-1/ && npm run mount", (error, stdout, stderr) => {
            if (error) {
                console.error(`error: ${error.message}`);
                result= error;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                result= stderr;
            }
            res.json({result})
        });
    } catch (error) {
        console.error(`error: ${error.message}`);
        res.json({error:error.message})
    }



})

module.exports = router;