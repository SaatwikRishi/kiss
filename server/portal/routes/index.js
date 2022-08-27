var express = require('express');
var router = express.Router();
const portalController = require("../controller");
const { exec } = require("child_process");

/* GET home page. */
router.post('/api/login', portalController.login)
router.get('/api/logout', portalController.logout)
router.get('/api/getUser', portalController.getUser)
router.get('/api/getComments/:id', portalController.getComments)
router.post('/api/addComments', portalController.addComments)



router.post('/api/deploy', async (req, res, next) => {    
    const exececute=(cmd)=>{
        return new Promise((resolve, reject)=>{
            exec(cmd,  {maxBuffer: 1024 * 2048}, (err, stdout, stderr) => {
                if (err) {
                  console.error(`exec error: ${err}`);
                  reject({error:err});
                }
                console.log(stdout);
                resolve({success:stdout})
            });
        })

    }

    try {
        let result={
            cmd1:await exececute('cd /var/www/nodeapps/Team-1/'),
            cmd2:await exececute('ls -l -a'),
            cmd4:await exececute('npm run mount & /dev/null')
        }
        res.json({result})
        
    } catch (error) {
        console.error(`error: ${error.message}`);
        res.json({error:error.message})
    }



})

module.exports = router;
