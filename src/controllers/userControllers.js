import { userExist, createUser } from "../services/userServices"
import CryptoJS from "crypto-js"
import User from "../models/User"
import jwt from "jsonwebtoken";
import { resolvePreset } from "@babel/core";

export class UserControllers {
    //REGISTERING A USER
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


    //LOGIN
    async login(req, res, next) {
        try{
            const user = await User.findOne(
                {
                    username: req.body.username
                }
            );
           
            !user && res.status(401).json("Wrong User Name");
    
            const hashedPassword = CryptoJS.AES.decrypt(
                user.password,
                process.env.JWT_SEC
            ); 
            const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
            const inputPassword = req.body.password;
            originalPassword != inputPassword && 
                res.status(401).json("Wrong Password");
            const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
                {expiresIn:"3d"}
            );
            const { password, ...others } = user._doc;  
            res.status(200).json({...others, accessToken});
    
        }catch(err){
            res.status(500).json(err);
        }
    }

    //UPDATE A USER
    async updateUsers(req, res,next){
        if(req.body.password){
            req.body.passsword = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASSWORD_SECRETE,
            ).toString();
        }

        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            },
            {new:true});

        res.status(200).json(updatedUser);
        }catch(err){
            res.satus(500).json(err)
        }
    }

    //DELETE A USER
    async deleteUsers(req,res,next){
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    }catch(err){
        res.status(500).json(err)
    }

    //GET A USER BY ID
    async getUserById(req,res){
        try{
            const user = await User.findOneById(req.params.id)
            const{ password,...others}= user._docs;
            res.status(200).json(others);
        }catch(err){
        res.status(500).json(err); 
        }
    }

    //GET ALL USER
    async getAllUsers(req,res){
        const query = req.query.new;
        try{
            const users = query ? await User.find.sort({_id:-1}).limit(5)
            : await User.find();
            res.status(200).json(users);
        }catch(err){
            res.status(500).json(err)
        }
    }

    //USER STATISTICS
    async userStatistics(req,res){
        const date = new Date()
        const lastYear=new Date(date.setFullYear(date.getFullYear()-1 ))
        try{

        const data = await User.aggregate([
        {$match:{createdAt: {$gte: lastYear}}},
        {
            $project:{
                month:{$month:"$createdAt"}
            }
        },
        {
            $group:{
                _id:"$month",
                total:{$sum:1}
            }
        }
        ]);
        res.status(200).json(data )
        }catch(err){
            res.status(500).json(err)
        }
    }
}