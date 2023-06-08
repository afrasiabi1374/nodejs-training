import crypto from 'crypto'
import { getEnv, log } from './utils.mjs'
class Crypto
{
    #secretkey = ''
    constructor()
    {
        this.#secretkey = getEnv('SECRET_KEY')
        // log(this.#secretkey)
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
        try {

            return crypto.createHmac('sha256', this.#secretkey).update(str.toString()).digest('hex')
        } catch (e) {
            return e
        }
    }
    encryption(key, data) {
        try {
            const hashKey = this.hash(key)
            const key2 = hashKey.substring(0,32)
            const iv = hashKey.slice(32, -16)
            console.log(Buffer.from(key2));
            const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key2), iv)
            let encrypted = cipher.update(data, 'utf8', 'base64')
            encrypted += cipher.final('base64')
            return this.toBase64(encrypted)
        } catch (e) {
            return e
        }
    }
    decription(key, data){
        try {
            const hashKey = this.hash(key)
            const key2 = hashKey.substring(0,32)
            const iv = hashKey.slice(32, -16)
            data = this.fromBase64(data)
            const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key2), iv)
            let decripted =  decipher.update(data, 'base64')
            decripted+=decipher.final('utf8')
            return decripted

        } catch (e) {
            
        }
    }
}
export default new Crypto()