import ioredis from 'ioredis'
import { log, stringify, toNumber } from './utils.mjs'

class Redis
{

    #URI=null
    #redis = null
    constructor(URI)
    {
        this.#URI = URI
    }
    async connect(){
        try {
            try {
                this.#redis = new ioredis(this.#URI, {lazyConnect: true})
                this.#redis.connect()
                log(re)
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
            console.log(result);
        } catch (e) {
            return ''
        }
    }

}
export default Redis