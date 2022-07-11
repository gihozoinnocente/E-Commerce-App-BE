import  express from "express";
import {verifyToken,verifyTokenAndAuthorization,verifyTokenAndisAdmin} from "../../middleware/verifyToken"
import { CartControllers } from "../../controllers/cartsControllers";

const route = express.Router()
const cartControllers = new CartControllers()

route.post("/addCart",verifyToken,cartControllers.createCart)
route.put("/updateCart",verifyTokenAndAuthorization,cartControllers.updateCart)
route.delete("/delete",verifyTokenAndAuthorization,cartControllers.deleteCart)
route.get("/:userId",verifyTokenAndAuthorization,cartControllers.getCartById)
route.get("/",verifyTokenAndisAdmin,cartControllers.getAllCarts)

export default route