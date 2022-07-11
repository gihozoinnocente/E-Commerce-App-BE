import  express from "express";
import {verifyToken,verifyTokenAndAuthorization} from "../../middleware/verifyToken"
import { UserControllers } from "../../controllers/userControllers";

const route = express.Router()
const userControllers = new UserControllers()

route.put("/:id",verifyToken,userControllers.updateUsers)
route.delete("/:id",verifyTokenAndAuthorization,userControllers.deleteUsers)
route.get("/stat",userControllers.userStatistics)
export default route