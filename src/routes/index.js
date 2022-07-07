import express from 'express'
import welcomeRoutes from "./api/welcomeRoutes.js"
import authRoutes from "./api/authRoutes"
const routes = express.Router()

routes.use('/', welcomeRoutes)
routes.use('/auth', authRoutes)

export default routes