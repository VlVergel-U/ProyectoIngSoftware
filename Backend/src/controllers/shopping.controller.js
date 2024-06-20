import { shopping } from "../models/shopping.js";
import { products } from "../models/products.js";
import { customers } from "../models/customer.js";
import { detail } from "../models/detail.js";

export const getShoppings = async (req, res) => {
  try {
    const shoppingAll = await shopping.findAll();
    res.json(shoppingAll);
  } catch (error) {
    return res.status(500).json({ message: error.nessage });
  }
};

export const getShopping = async (req, res) => {
  const { id_shopping } = req.params;
  try {
    const shoppings = await shopping.findOne({
      where: { id_shopping },
    });
    res.json(shoppings);
  } catch (error) {
    return res.status(500).json({ message: error.nessage });
  }
};

export const createShopping = async (req, res) => {
  try {
    console.log(req.body);
    const { date_shopping, payment_metod, productName, amount, document } =
      req.body;

    const product = await products.findOne({
      where: {
        name: productName,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const newStock = product.stock - amount;

    if (newStock < 0) {
      return res.status(400).json({
        message: "No hay suficiente stock disponible para esta compra",
      });
    }

    const customer = await customers.findOne({
      where: {
        document,
      },
    });

    if (!customer) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    const newShopping = await shopping.create({
      final_price: product.sale_price * amount,
      unit_price: product.sale_price,
      date_shopping,
      payment_metod,
      id_customer: customer.id_customer,
    });

    const newDetail = await detail.create({
      productId: product.id,
      shoppingIdShopping: newShopping.id_shopping,
      amount,
      price: newShopping.final_price,
    });

    await product.update({ stock: newStock });

    res.json({
      message: "Compra registrada correctamente",
      newDetail,
      newShopping,
    });
  } catch (error) {
    console.error("Error al procesar la compra:", error);
    return res.status(500).json({ message: error.message });
  }
};
