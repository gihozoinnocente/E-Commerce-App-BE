import express, { json } from 'express';
import Order from '../../src/models/Order';

export class OrderControllers {
    //ADD ORDER BY USER
    async createOrder(req, res) {

        const newOrder = new Order(req.body)
        try {
            const addNewOrder = await newOrder.save()
            res.status(200).json(addNewOrder)
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }


    //UPDATE ORDER
    async updateOrder(req, res, next) {
        try {
            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },
                { new: true });

            res.status(200).json(updatedOrder);
        } catch (err) {
            res.satus(500).json(err)
        }
    }

    //DELETE ORDER
    async deleteOrder(req, res, next) {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted")
    } catch(err) {
        res.status(500).json(err)
    }

    //GET A ORDER BY ID
    async getOrderById(req, res) {
        try {
            const orders = await Order.findOne({userId: req.params.userId})
            res.status(200).json(orders);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    //GET ALL USER CART
    async getAllOrders(req, res) {
        
        try {
          const orders = await Order.find()
            res.status(200).json(orders)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async monthIncome(req,res){
        const date =new Date()
        const lastMonth = new Date(date.setMonth() -1)
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))
        try{
        const income = await Order.aggregate([
            {$match:{createdAt:{$gte:previousMonth}}},
            {$project:{
                month:{month:"$createdAt"},
                sales:"$amount"
            },
        },
        {
            $group:{ 
                _id:"$month",
                total:{$sum:"$sales"}
            
        },
        },
        ]);
        }catch(err){
            res.status(500).json(err)
        }
    }
    
}