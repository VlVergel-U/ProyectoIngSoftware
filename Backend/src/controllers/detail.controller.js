import { detail } from "../models/detail.js";
import { products } from "../models/products.js";
import { shopping } from "../models/shopping.js";
import { customers } from "../models/customer.js";

export const getDetails = async (req, res) => {
  try {
    const detailAll = await detail.findAll();
    res.json(detailAll);
  } catch (error) {
    return res.status(500).json({ message: error.nessage });
  }
};

export const getDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const details = await detail.findOne({
      where: { id },
      include: [{ model: products }, { model: shopping }],
    });

    if (!details) {
      return res.status(404).json({ message: "Detail not found" });
    }

    res.json(detail);
  } catch (error) {
    console.error("Error fetching detail:", error);
    res.status(500).json({ message: error.message });
  }
};
export const getBilling = async (req, res) => {
  const { shoppingIdShopping } = req.params;
  try {
    const detailRout = await detail.findOne({
      where: { productId: shoppingIdShopping },
    });
    const billingShopping = await shopping.findOne({
      where: { id_shopping: detailRout.shoppingIdShopping },
      attributes: {
        exclude: ["unit_price", "id_customer"],
      },
      include: {
        model: customers,
        attributes: {
          exclude: ["id_customer"],
        },
      },
    });
    const billingProduct = await products.findOne({
      where: {
        id: detailRout.productId,
      },
      attributes: {
        exclude: ["shopping_price", "category_Type"],
      },
    });

    res.json({
      billingDetail: { amount: detailRout.amount, price: detailRout.price },
      billingShopping,
      billingProduct,
    });
    
  } catch (error) {
    console.error("Error al obtener los detalles de la compra:", error);
    return res.status(500).json({ message: error.message });
  }
};
