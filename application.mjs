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
log(crypto.toBase64('salam ali khoobi?'))
log(crypto.fromBase64('c2FsYW0gYWxpIGtob29iaT8='))
log(fs.fileExists('./a'));
log(fs.fileExists('./a'));
log(fs.isDirectory('./a'));
log(fs.unlink('./b'));

class Application {
    #app = null
    #templateEngine = null
    constructor()
    {
        this.#initExpress()
        this.#initRoute()
    }

    async #initExpress() {
        log(`application is CALL`);
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
        log(`application is run`);
        log('ok2')
        const g = getEnv('LIST')
        const PORT = getEnv('PORT', 'number')
        this.#app.listen(PORT, async() => {
            log(`app listen on port = > ${PORT} `)
        })
    }
}
export default new Application()