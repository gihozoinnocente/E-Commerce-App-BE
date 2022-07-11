import express from 'express';
import Product from '../../src/models/Product';

export class ProductControllers {
    async createProduct(req, res) {

        const newProduct = new Product(req.body)
        try {
            const addNewProduct = await newProduct.save()
            res.status(200).json(addNewProduct)
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }


    //UPDATE PRODUCT
    async updateProduct(req, res, next) {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },
                { new: true });

            res.status(200).json(updatedProduct);
        } catch (err) {
            res.satus(500).json(err)
        }
    }

    //DELETE PRODUCT
    async deleteProduct(req, res, next) {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted")
    } catch(err) {
        res.status(500).json(err)
    }

    //GET A PRODUCT BY ID
    async getProductById(req, res) {
        try {
            const product = await Product.findOneById(req.params.id)
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    //GET ALL PRODUCT
    async getAllProduct(req, res) {
        const qNew = req.query.new;
        const qcategory = req.query.categories;
        try {
            let products;
            if(qNew){
                products= await Product.find().sort({createdAt:-1}).limit(1);
            } else if(qcategory){
                products=await Product.find({
                    categories:{
                        $in:[qcategory],
                    },
                });
            } else{
                products= await Product.find()
            }
            res.status(200).json(products)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    
}