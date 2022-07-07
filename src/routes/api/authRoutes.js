import  express  from "express";
import { UserControllers } from "../../controllers/userControllers";

const route = express.Router()
const userControllers = new UserControllers()

route.post('/register',userControllers.register)
route.post('/login' ,userControllers.login)
export default route