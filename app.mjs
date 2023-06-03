import application from "./application.mjs"
import { log } from "./core/utils.mjs"
import fileUpload from "express-fileupload"

async function main()
{
    try {
        await application.run()
    } catch (e) {
        log(e.toString())
    }
}

main()