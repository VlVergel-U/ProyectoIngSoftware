import{products} from "../models/products.js"

export const getProducts = async (req, res) =>{
    try{
        const productsAll = await products.findAll()
        res.json(productsAll)
    } catch (error){
        return res.status(500).json({message: error.nessage})
    }
}


export const createProducts = async (req, res) =>{
    try{
        console.log(req.body)
        const {name, shopping_price, sale_price, stock, trademark, category_Type}= req.body
        const newProducts = await products.create({
            name, 
            shopping_price, 
            sale_price,
            stock, 
            trademark,
            category_Type
        })
        res.json(newProducts)
    } catch (error){
        return res.status(500).json({message: error.nessage})
    }
}

export const getProduct = async (req,res) =>{
    const {id} = req.params
    
    try{
        const product = await products.findOne({
            where:{ id }
        })
        res.json(product)
    } catch(error){
        return res.status(500).json({message: error.nessage})
    }

}

export const updateProduct = async(req, res)=>{
    const {id}= req.params
    try{
        const product = await products.findOne({
            where:{id}
        })
        console.log(product);
        product.set(req.body);
        await product.save();
        return res.json(product);
    } catch(error){
        return res.status(500).json({message: error.nessage})
    }
}