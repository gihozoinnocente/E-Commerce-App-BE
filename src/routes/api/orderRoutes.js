import  express from "express";
import {verifyToken,verifyTokenAndAuthorization,verifyTokenAndisAdmin} from "../../middleware/verifyToken"
import { OrderControllers } from "../../controllers/orderControllers";

const route = express.Router()
const orderControllers = new OrderControllers()

route.post("/addOrder",verifyToken,orderControllers.createOrder)
route.put("/updateOrder",verifyTokenAndisAdmin,orderControllers.updateOrder)
route.delete("/delete",verifyTokenAndAuthorization,orderControllers.deleteOrder)
route.get("/:userId",verifyTokenAndAuthorization,orderControllers.getOrderById)
route.get("/",verifyTokenAndisAdmin,orderControllers.getAllOrders)

export default route