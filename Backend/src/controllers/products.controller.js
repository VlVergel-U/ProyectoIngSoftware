import{products} from "../models/products.js"

export const getProducts = async (req, res) =>{
    try{
        const productsAll = await products.finAll()
        res.json(productsAll)
    } catch (error){
        return res.status(500).json({message: error.nessage})
    }
}


export const createProducts = async (req, res) =>{
    try{
        console.log(req.body)
        const {name, shopping_price, sale_price, stock, trademark}= req.body
        const newProducts = await products.create({
            name, 
            shopping_price, 
            sale_price,
            stock, 
            trademark
        })
        res.json(newProducts)
    } catch (error){
        return res.status(500).json({message: error.nessage})
    }
}