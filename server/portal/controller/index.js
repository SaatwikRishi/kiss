var loginModel = require("../model/login");


const portalController = {

    login: async (req, res, next) => {
        try {
            let result= await loginModel.procesLogin(req,res)
            res.json({result})
        } catch (error) {
            res.json({error:error.stack})
        }
    },
    logout: async (req, res, next) => {
        try {
            res.cookie('user',null,{ maxAge:  7 * 24 * 30 * 365 * 1000, httpOnly: true }) 
            res.json({result:'logout success'})
        } catch (error) {
            res.json({error:error.stack})
        }

    },
    getUser: async (req, res, next) => {
        try {
            let user= req.cookies['user']
            let result=user
            if(user==='j:null'){
                result=null
            }
            res.json({result})        
        } catch (error) {     
            console.error(error)  
            res.json({
                result:{redirect:true}
            })
        }
    },
    

}

module.exports = portalController;