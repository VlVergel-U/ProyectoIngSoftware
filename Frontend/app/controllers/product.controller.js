const Product = require('../public/Product/product.js');

// Controlador para manejar las operaciones relacionadas con los productos
const productController = {
    // Crear un nuevo producto
    async createProduct(req, res) {
        try {
            const { product_id, name, category, quantity, sell_price, buy_price } = req.body;
            const newProduct = await Product.create(product_id, name, category, quantity, sell_price, buy_price);
            res.status(201).json({ success: true, message: 'Producto agregado correctamente.', product: newProduct });
        } catch (error) {
            console.error('Error al agregar producto:', error);
            res.status(500).json({ success: false, message: 'Error interno del servidor.' });
        }
    },

    // Obtener todos los productos
    async getAllProducts(req, res) {
        try {
            const products = await Product.getAll();
            res.status(200).json({ success: true, products });
        } catch (error) {
            console.error('Error al obtener productos:', error);
            res.status(500).json({ success: false, message: 'Error interno del servidor.' });
        }
    },

    // Actualizar un producto por ID
    async updateProduct(req, res) {
        try {
            const productId = req.params.id;
            const { name, category, quantity, sell_price, buy_price } = req.body;
            const updatedProduct = await Product.updateById(productId, { name, category, quantity, sell_price, buy_price });
            res.status(200).json({ success: true, message: 'Producto actualizado correctamente.', product: updatedProduct });
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            res.status(500).json({ success: false, message: 'Error interno del servidor.' });
        }
    },

    // Eliminar un producto por ID
    async deleteProduct(req, res) {
        try {
            const productId = req.params.id;
            await Product.deleteById(productId);
            res.status(200).json({ success: true, message: 'Producto eliminado correctamente.' });
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            res.status(500).json({ success: false, message: 'Error interno del servidor.' });
        }
    }

};

export default productController;
