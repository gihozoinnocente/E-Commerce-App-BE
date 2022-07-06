import express from 'express'
import welcomeRoutes from "./api/welcomeRoutes.js"

const routes = express.Router()

routes.use('/', welcomeRoutes)

export default routes