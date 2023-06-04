import i18next from "i18next";
import { getEnv, log } from "./utils.mjs";
import fa from "../langs/fa/fa.mjs";
// log(fa)
class Translate 
{
    constructor()
    {
        i18next.init({
            resources: {
                fa: {
                    translation: fa
                }
            }
        })
        i18next.changeLanguage(getEnv('APP_LANG'))
    }
    
    changeLanguage(lang)
    {
        i18next.changeLanguage(getEnv('APP_LANG'))
    }

    get(key, data={}){
        return i18next.t(key,data)
    }
}

export default new Translate()