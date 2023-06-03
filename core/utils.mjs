import dotenv from 'dotenv'
dotenv.config() 
export function getEnv(key, cast='string'){
    let ret = ''
    switch (cast) {
        case 'number':
            ret = toNumber(process.env[key])
            break;
        case 'bool':
            if (process.env[key] === 'true') {
                ret = true
            } else if(process.env[key] === 'false'){
                ret = false
            }

            break;
            default:
                ret = process.env[key]
            break;
    }
    return ret ?? ''
}
export function log(obj) {
    console.log('from loger =>>', obj);
}
export function toNumber(str){
    try {
        const ret = Number(str)
        return isNaN(ret) ? 0 : ret
    } catch (e) {
        return 0
    }
}