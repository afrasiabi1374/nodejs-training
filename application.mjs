import { getEnv, log, sleep } from "./core/utils.mjs";
import  Express  from "express";
import route from "./routes/route.mjs";
import nunjucks from 'nunjucks'
import Error500 from "./controllers/Error500Controller.mjs";
import Error404Controller from "./controllers/Error404Controller.mjs";
import Error500Controller from "./controllers/Error500Controller.mjs";
import fileUpload from "express-fileupload";
import translate from "./core/translate.mjs";
import * as fs from './core/fs.mjs'
import crypto from "./core/crypto.mjs";
import datetime from "./core/datetime.mjs";
// log(crypto.encryption('meisam123', 'salam!salam!salam!salam! '))
// log(crypto.decription('meisam123','em50cmJOR1hzNWNiNnFwVU1UZTJPQmN5anhzKy9STVFtandSVmJqQ0l4aFpvbG1hZVNqeUxzTWZqU3podUZCTHNPMVRSLzZJNTFhTmlZdmlIZVprRDF4eVJqb21FR1lYWjFldlM1WWU1c2F2ZUhLbXpLaUtONXVRN3BmenREWWg'))
log(datetime.toString('YYYY-MM-DD HH:mm:ss'))
log(datetime.toDataTime('1990-01-05 20:10:25').add('10', 'day').add('5', 'hour').format('YYYY-MM-DD HH:mm:ss'))
log(datetime.toJalaali('1996-02-06'))
log(datetime.toGregorian('1374-11-17'))
class Application {
    #app = null
    #templateEngine = null
    constructor()
    {
        this.#initExpress()
        this.#initRoute()
    }

    async #initExpress() {
        // log(`application is CALL`);
        this.#app = Express()
        this.#app.use(Express.static('assets'))
        this.#app.use(Express.static('media'))
        this.#app.use(Express.urlencoded({extended: true, limit: '10mb'}))
        this.#app.use(Express.json({limit: '10mb'}))
        const templateDir = `templates/${getEnv('TEMPLATE')}/`
        // log(templateDir)
        this.#app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }))
        this.#templateEngine = nunjucks.configure(templateDir, {
            autoescape: true,
            express: this.#app,
            noCache: false
        })
        this.#templateEngine.addGlobal('t', translate.t)
    }
    async #initRoute()
    {
        this.#app.use('/', route)
        // طبق آموزشی که دیدیم روت یکی به آخر ارور 404 و روت آخری ارور 500
        this.#app.use(Error404Controller.handle)
        this.#app.use(Error500Controller.handle)
    }
    async run(){
        // log(`application is run`);
        // log('ok2')
        log(datetime.getTimeStamp())
        const g = getEnv('LIST')
        const PORT = getEnv('PORT', 'number')
        this.#app.listen(PORT, async() => {
            log(`app listen on port = > ${PORT} `)
        })
    }
}

export default new Application()