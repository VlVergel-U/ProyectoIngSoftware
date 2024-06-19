import { customers } from "../models/customer.js";
import { Op } from "sequelize";

export const getCustomers = async (req, res) => {
  try {
    const customerAll = await customers.findAll();
    res.json(customerAll);
  } catch (error) {
    return res.status(500).json({ message: error.nessage });
  }
};

export const createCustomers = async (req, res) => {
  try {
    console.log(req.body);
    const { document, name, last_name, addres, phone, email } = req.body;
    const newCustomer = await customers.create({
      document,
      name,
      last_name,
      addres,
      phone,
      email,
    });
    res.json(newCustomer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCustomer = async (req, res) => {
  const { id_customer, document } = req.params;
  let customer;
  try {
    if (id_customer) {
      customer = await customers.findAll({
        where: { id_customer },
      });
    } else if (document) {
      customer = await customers.findAll({
        where: {
          document: {
            [Op.like]: `%${document}%`,
          },
        },
      });
    }

    if (!customer) {
      return res.status(404).json({ message: "customer no encontrado" });
    }
    res.json(customer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  const { id_customer } = req.params;
  const { addres, phone, email } = req.body;
  try {
    const customer = await customers.findOne({
      where: {
        id_customer,
      },
    });
    if (!customer) {
      return res.status(404).json({ message: "customer no existe" });
    }
    customer.addres = addres ?? customer.addres;
    customer.phone = phone ?? customer.phone;
    customer.email = email ?? customer.email;
    await customer.save();
    res.status(200).json({ message: "customer actualizado" });
  } catch (error) {
    return res.status(500).json({ message: error.nessage });
  }
};
