import { userExist, createUser } from "../services/userServices"
import CryptoJS from "crypto-js"
import User from "../models/User"

export class UserControllers {
    async register(req, res) {
        try {
            const exist = await userExist(req.body.email)
            if (exist) {
                res.status(409).json({ status: 409, message: "User with this email already exist." })
            } else {
                const user = {
                    username: req.body.username,
                    email: req.body.email,
                    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRETE),
                    
                }
                const createdUser = await createUser(user)
                res.status(201).json({ status: 201, message: "user registered successfully", user: createdUser })
            }
        } catch (error) {
            res.status(500).json({message: "Internal server error!"})
        }
    }


    async login(req, res, next) {
        console.log(req.body)
        try {
            const user = await User.findOne({username:req.body.username})

            const hashedPassword = CryptoJS.AES.decrypt(
                user.password, process.env.PASSWORD_SECRETE
                )

            const password = hashedPassword.toString(CryptoJS.enc.Utf8)
            res.status(200).json({status:200, message:"user logged in sussccfully", user})
            // if(!user || password !== req.body.password){
            //     res.status(401).json("Wrong Credentials!")
            // } else {
            //     res.status(200).json(user)
            // }
            

           
        }  catch (err) {
            console.log(err)
            res.status(500).json({message: "Internal server error!"})
        }
    }
}