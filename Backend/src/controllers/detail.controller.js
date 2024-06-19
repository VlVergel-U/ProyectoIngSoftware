import { detail } from "../models/detail.js";
import { products } from "../models/products.js";
import { shopping } from "../models/shopping.js";
import { customers } from "../models/customer.js";

export const getDetails = async (req,res) =>{
    try{
        const detailAll= await detail.findAll();
        res.json(detailAll);
    }catch(error){
        return res.status(500).json({ message: error.nessage });
    }
}

export const getDetail = async (req, res) => {
    const { id } = req.params; 
    try {
        const details = await detail.findOne({
            where: { id },
            include: [
                { model: products },
                { model: shopping }
            ]
        });

        if (!details) {
            return res.status(404).json({ message: "Detail not found" });
        }

        res.json(detail);
    } catch (error) {
        console.error('Error fetching detail:', error);
        res.status(500).json({ message: error.message });
    }
}
export const getBilling = async (req, res) => {
    const {shoppingIdShopping}=req.params;
    try{
        const billing= detail.findOne({
            where:{shoppingIdShopping},
            attributes:{
                exclude:['shoppingIdShopping','productId'],
            },
            include:[
                {
                    model:shopping,
                    attributes:['id_shopping','final_price','date_shopping','payment_metod'],
                    include:{
                        model:customers,
                        attributes:['document','name','last_name','addres','phone','email']
                    }
                },
                {
                    model:products,
                    attributes:['id','name','sale_price','trademark']
                }
            ]
        })
        res.json(billing)
    } catch (error) {
        console.error('Error fetching detail:', error);
        res.status(500).json({ message: error.message });
    }
}