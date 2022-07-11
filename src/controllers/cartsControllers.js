import express from 'express';
import Cart from '../../src/models/Cart';

export class CartControllers {
    async createCart(req, res) {

        const newCart = new Cart(req.body)
        try {
            const addNewCart = await newCart.save()
            res.status(200).json(addNewCart)
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }


    //UPDATE CART
    async updateCart(req, res, next) {
        try {
            const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },
                { new: true });

            res.status(200).json(updatedCart);
        } catch (err) {
            res.satus(500).json(err)
        }
    }

    //DELETE CART
    async deleteCart(req, res, next) {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted")
    } catch(err) {
        res.status(500).json(err)
    }

    //GET A CART BY ID
    async getCartById(req, res) {
        try {
            const cart = await Cart.findOne({userId: req.params.userId})
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    //GET ALL USER CART
    async getAllCarts(req, res) {
        
        try {
          const carts = await Cart.find()
            res.status(200).json(carts)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    
}