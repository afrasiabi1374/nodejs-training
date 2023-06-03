import dotenv from 'dotenv'
import DotenvExpand from 'dotenv-expand'
const env = dotenv.config()
DotenvExpand.expand(env)
import autoBind from 'auto-bind'
export default class BaseController
{
    constructor()
    {
        if(this.constructor === BaseController) {
            throw new Error(`BaseController is Abstract !`)
        }
        autoBind(this)
    }
    toError(error, req, res)
    {
        try {
            return res.status(500).send(error.toString())
        } catch (e) {
            return res.status(500).send(e.toString())
        }
    }
    input(field){
        try {
            if (!Array.isArray(field)) {
                if (typeof field === 'string')  {
                    return field.trim()
                }
            }else {
                return '' 
            }
        }
        catch(e){
            return ''
        }
    }
}
