import { products } from "../models/products.js";
import {category } from "../models/category.js"
import { Op } from "sequelize";

export const getProducts = async (req, res) => {
    try {
        const productsAll = await products.findAll({
            attributes:{
                exclude:['category_Type']
            },
            include: {
                model: category,
                attributes: ['Trademark']
            }
        });
        res.json(productsAll);
    } catch (error) {
        return res.status(500).json({ message: error.nessage });
    }
};

export const createProducts = async (req, res) => {
    try {
        console.log(req.body);
        const {
            name,
            shopping_price,
            sale_price,
            stock,
            trademark,
            category_Type
        } = req.body;
        const newProducts = await products.create({
            name,
            shopping_price,
            sale_price,
            stock,
            trademark,
            category_Type
        });
        res.json(newProducts);
    } catch (error) {
        return res.status(500).json({ message: error.nessage });
    }
};

export const getProduct = async (req, res) => {
    const { id, name  } = req.params;
    let product;
    try {
        if(id){
            product = await products.findOne({
                where: { id },
                attributes:{
                    exclude:['category_Type']
                },
                include: {
                    model: category,
                    attributes: ['Trademark']
                }
            });
        }else if(name){
            product= await products.findOne({
                where: {
                    name: {
                      [Op.iLike]: `%${name}%`
                    }
                  },
                attributes:{
                    exclude:['category_Type']
                },
                include: {
                    model: category,
                    attributes: ['Trademark']
                }
            })
        }
        
        res.json(product);
    } catch (error) {
        return res.status(500).json({ message: error.nessage });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, shopping_price, sale_price, stock, trademark } = req.body;
    try {
        const product = await products.findOne({
            where:{
                id
            }
        })
        if (!product) {
            return res.status(404).json({ message: 'Product noo existe' });
        }
        product.name = name ?? product.name;
        product.shopping_price = shopping_price ?? product.shopping_price;
        product.sale_price = sale_price ?? product.sale_price;
        product.stock = stock ?? product.stock;
        product.trademark = trademark ?? product.trademark;

    await product.save();
    res.json({ message: 'Product actualizado ', product });
    } catch (error) {
        return res.status(500).json({ message: error.nessage });
    }
};
