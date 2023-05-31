import { log } from "./core/utils.mjs";
import  Express  from "express";
import route from "./routes/route.mjs";
class Application {
    #app = null
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
    }
    async #initRoute()
    {
        this.#app.use('/', route)
    }
    async run(){
        log(`application is run`);
        this.#app.listen(3600, async() => {
            log(`app listen on port = > 3600 `)
        })
    }
}
export default new Application()