import express from 'express'
import { welcome } from '../../controllers/welcomeControllers'

const route = express.Router()

route.get('/', welcome)

export default route