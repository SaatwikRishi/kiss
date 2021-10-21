var loginModel = require("../model/login");


const portalController = {

    login: async (req, res, next) => {
        try {
            let result= await loginModel.procesLogin(req,res)
            res.json({result})
        } catch (error) {
            res.json({error:error.stack})
        }

    }

}

module.exports = portalController;