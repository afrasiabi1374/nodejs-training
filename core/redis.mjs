import ioredis from 'ioredis'
import {  log, stringify, toNumber, isJSON, toJSON } from './utils.mjs'
class Redis
{
    #URI=null
    #redis = null
    get redis()
    {
        return this.#redis
    }
    async connect(URI){
        try {
            try {
                this.#URI = URI
                this.#redis = new ioredis(this.#URI, {lazyConnect: true})
                this.#redis.connect()
                return true
            } catch (e) {
                return false
            }

            // await r.set("meisam", "9999")

        } catch (e) {
            return false
        }
    }

    async set(key, data = {}, ex = 0)
    {
        try {
            log(typeof data)
            data = (typeof data === 'string') ? data : stringify(data)
            ex = toNumber(ex) > 0 ? ex : 0
            if(ex > 0){
                await this.#redis.set(key, data, 'ex', ex)
            } else {
                await this.#redis.set(key, data)
            }
        } catch (e) {
            return false
        }
    }

    async get(key){
        try {
            const result = await this.#redis.get(key)
            log(isJSON(result))
            if (result) {
                    return isJSON(result) ? toJSON(result) : result
            } else {
                return ''
            }
        } catch (e) {
            return ''
        }
    }
    async del(key)
    {
        try {
            await this.#redis.del(key)
            return true
        } catch (error) {
            return false
        }
    }
}
const RedisObject = new Redis()
export {RedisObject as Redis}