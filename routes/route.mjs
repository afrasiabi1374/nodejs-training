import { Router } from "express";
import userRoute from './user.mjs'
import testRoute from './test.mjs'
const route =  Router()


route.use('/user', userRoute)
route.use('/test', testRoute)
export default route