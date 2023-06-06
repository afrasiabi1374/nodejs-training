import crypto from 'crypto'
import { getEnv, log } from './utils.mjs'
class Crypto
{
    #secretkey = ''
    constructor()
    {
        this.#secretkey = getEnv('SECRET_KEY')
        log(this.#secretkey)
    }
    toBase64(str){
        try {
            return Buffer.from(str.toString()).toString('base64url')
        } catch (e) {
            return ''
        }
    }
    fromBase64(str){
        try {
            return Buffer.from(str.toString(), 'base64url').toString('utf-8')
        } catch (e) {
            return ''
        }
    }

    hash(str)
    {
         
    }
}
export default new Crypto()