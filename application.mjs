import { getEnv, log } from "./core/utils.mjs";
import  Express  from "express";
import route from "./routes/route.mjs";
import nunjucks from 'nunjucks'
import Error500 from "./controllers/Error500Controller.mjs";
import Error404Controller from "./controllers/Error404Controller.mjs";
import Error500Controller from "./controllers/Error500Controller.mjs";
import fileUpload from "express-fileupload";


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
        this.#templateEngine = nunjucks.configure(templateDir, {
            autoescape: true,
            express: this.#app,
            noCache: false
        })
        this.#app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }))
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
        const g = getEnv('LIST')
        const PORT = getEnv('PORT', 'number')
        this.#app.listen(PORT, async() => {
            log(`app listen on port = > ${PORT} `)
        })
    }
}
export default new Application()