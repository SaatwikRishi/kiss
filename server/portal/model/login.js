const crypto = require('crypto');
const salt=process.env.salt
const _ = require("lodash")
var loginModel = {
    procesLogin: async (req,res) => {
        try {
            let profile = {}
            let isProfileUpdate=true;
            let status = "active"
            let { body } = req
            let { email, password } = body
            let encryptPwd = loginModel.encrypt(password)
            let query = await req.db.query(`select * from tbl_students where email='${email}' and password='${encryptPwd}'`,'login')
            if (query.length > 0) {
                profile = query[0]                
                if (profile.status > 0) {
                    let tags=profile.tags
                    if(tags ===null || tags ===""){
                        isProfileUpdate=false
                    }
                    tags=_.split(tags,",")
                    profile.tags=tags
                    profile.isProfileUpdate=isProfileUpdate
                    profile.status=status
                    let fields = JSON.parse(profile.student_json)
                    profile["fields"] = { ...fields[0] }
                    delete profile.student_json                   
                    res.cookie('user',profile, { maxAge: 9000000 * 27 * 360 , httpOnly: true })
                } else {
                    profile.status="Your account still is in pending state, Please send mail to the Admin to activate your account"
                }
            }else{
                profile["status"]="Invalid E-mail and password"
            }
            return profile
        } catch (error) {
            console.error({ error: { procesLogin: error.stack } })
            return error.stack;
        }
    },
    encrypt(password) {
        let hash=crypto.pbkdf2Sync(password, salt,  1000, 64, `sha512`).toString(`hex`); 
        console.log({salt,hash})
        return hash
    }



};

module.exports = loginModel;