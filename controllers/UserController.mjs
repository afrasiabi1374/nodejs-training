import BaseController from "../core/BaseController.mjs";
import { validationResult, body, query, param, header } from "express-validator";

class UserController extends BaseController
{
    constructor(){
        super()
    }
    async #loginValidation(req) {
        await query('email').not().isEmpty().withMessage("enter  MAIL__ ali JOON").isEmail().withMessage("email has wrong format").run(req)
        await query('username').not().isEmpty().withMessage("enter user __USERNAME ali JOON").run(req)
        await query('password').not().isEmpty().withMessage("enter PASSWORD__ please ali JOON").run(req)
       return validationResult(req)
   }
    async login(req, res) {
        try {

            const result = await this.#loginValidation(req)
            console.log('error ===>>>>>', result?.errors[0]?.msg);
            if (!result.isEmpty()) {
                return res.send(result?.errors[0]?.msg)
            }

            const username = super.input(req.query.username)
            return res.render('user/login.html')
        } catch (e) {
            super.toError(e, req, res)
        }
    }

    
}


export default new UserController()