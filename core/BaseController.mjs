import dotenv from 'dotenv'
import DotenvExpand from 'dotenv-expand'
const env = dotenv.config()
DotenvExpand.expand(env)
import autoBind from 'auto-bind'
import {getEnv, log} from './utils.mjs'
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
            const debug = getEnv('DEBUG', 'bool')
            log(debug)
            if (getEnv('DEBUG', 'bool')) {
                return res.status(500).send(error.toString())
            } else {
                return res.status(500).send('Internal Server Error !')
            }
        } catch (e) {
            if (getEnv('DEBUG', 'bool')) {
                return res.status(500).send(e.toString())
            } else {
                return res.status(500).send('Internal Server Error !')
            }
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
