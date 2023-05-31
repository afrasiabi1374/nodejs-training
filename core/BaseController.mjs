import autoBind from 'auto-bind'
export default class BaseController
{
    constructor()
    {
        if(this.constructor === BaseController) {
            throw new Error(`BaseController is Abstract !`)
        }
        autoBind(this)
    }
}
