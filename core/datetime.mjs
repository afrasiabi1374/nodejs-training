import moment from "moment"
import momentTimeZone from "moment-timezone"
import {getEnv} from './utils.mjs'
import momentjalaali from 'moment-jalaali'
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
    toDataTime(datetime = ''){
        try {
            // اگه خالی بود زمان جاریو بده نبود زمان سفارشی
            return (datetime === '') ? moment.tz(this.#timeZone) : moment.tz(datetime, this.#timeZone)
        } catch (e) {
            
        }
    }
    toJalaali(str, format = 'jYYYY-jMM-jDD'){
        // میلادی به جلالی
        try {
            return momentjalaali(str).format(format)
        } catch (e) {
            return ''
        }
    }
    //
    toGregorian(str, format = 'YYYY-MM-DD '){
        // جلالی به میلادی
        try {
            return momentjalaali(str, 'jYYYY-jMM-jDD').format(format)
        } catch (e) {
            return ''
        }
    }
}
export default new DateTime()