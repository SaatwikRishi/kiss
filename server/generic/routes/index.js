var express = require('express');
var moment = require('moment-timezone');
var _ = require('lodash');
var router = express.Router();
moment.tz('America/Los_Angeles')

let {environment}=process.env

router.get('/getUser/', async(req, res)=>{
    try {
        res.cookie('user',"{\"issuer\":\"https://ssoqa.paypalcorp.com\",\"_authnStatement\":{\"AuthnInstant\":\"2021-08-12T08:33:32.534Z\",\"SessionIndex\":\"IeLIZ5_OvZ3q74SJhu6JND_ZhSs\"},\"nameID\":\"khizahmed\",\"nameIDFormat\":\"urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified\",\"country\":\"0\",\"employeeType\":\"PrimaryUser\",\"manager\":\"CN=Vellore Rajanbabu\\\\, Venkatesh Khanna(vkhanna),OU=Site-MAA,OU=Accounts_User,OU=Corp,OU=Paypal,DC=paypalcorp,DC=com\",\"name\":\"Khizar Ahmed\",\"title\":\"MTS 1, Software Engineer\",\"department\":\"ESP Enterprise Operations CHN\",\"qid\":\"Q20027879\",\"username\":\"khizahmed\"}",{ maxAge:  7 * 24 * 60 * 60 * 1000, httpOnly: true }) 
        let user= req.cookies['user']
        res.json({result:JSON.parse(user)})        
    } catch (error) {     
        console.error(error)  
        res.json({
            result:{redirect:true,environment}
        })
    }   
})



module.exports = router;
