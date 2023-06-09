import moment from "moment"
import momentTimeZone from "moment-timezone"
import {getEnv} from './utils.mjs'
class DateTime {
    #timeZone = null
    constructor()
    {
        this.#timeZone = getEnv('TIME_ZONE')
    }
    getTimeStamp(){ 
        try {
            return moment.tz(this.#timeZone).unix()
        } catch (e) {
            return 0
        }
    }

    toString(format = 'YYYY-MM-DD HH:mm:ss')
    {
        try {
            return moment.tz(this.#timeZone).format(format)
        } catch (e) {
            
        }
    }
    toDataTime(){
        try {
            return moment.tz(this.#timeZone)
        } catch (e) {
            
        }
    }
}
export default new DateTime()