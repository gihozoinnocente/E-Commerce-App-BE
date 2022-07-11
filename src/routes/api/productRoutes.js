import  express from "express";
import {verifyToken,verifyTokenAndAuthorization} from "../../middleware/verifyToken"
import { ProductControllers } from "../../controllers/productControllers";

const route = express.Router()
const productControllers = new ProductControllers()

route.post("/addProduct",productControllers.createProduct)
route.put("/updateProduct",productControllers.updateProduct)
route.delete("/delete",productControllers.deleteProduct)
route.get("/",productControllers.getAllProduct)
export default route