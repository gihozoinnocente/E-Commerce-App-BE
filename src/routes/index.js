import express from 'express'
import welcomeRoutes from "./api/welcomeRoutes.js"
import authRoutes from "./api/authRoutes"
import userRoutes from "./api/userRoutes"
import productRoutes from "./api/productRoutes"
import cartRoutes from "./api/cartRoutes"
import orderRoutes from "./api/orderRoutes"
const routes = express.Router()

routes.use('/', welcomeRoutes)
routes.use('/auth', authRoutes)
routes.use('/auth/update', userRoutes)
routes.use('/auth/delete',userRoutes)
routes.use('/auth', userRoutes)
routes.use('/products',productRoutes)
routes.use('/carts',cartRoutes)
routes.use('/orders',orderRoutes)

export default routes