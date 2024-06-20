import { category } from "../models/category.js";
import { user } from "../models/user.js";

export const createCategory = async () => {
  try {
    const count = await category.count();
    if (count > 0) return;

    const categoryCreate = [
      { Trademark: "manijas" },
      { Trademark: "cauchos" },
      { Trademark: "pines" },
    ];
    await category.bulkCreate(categoryCreate);

    const createdCategory = await category.findAll();
    console.log("categorias creadas con exito");
    createdCategory.forEach((category) => {
      console.log("ID: " + category.id + ", Nombre: " + category.name);
    });
  } catch (error) {
    console.error(error);
  }
};

export const createAdmin = async () => {
  try {
    const adminFound = await user.findOne();
    if (adminFound) return;

    const adminRegistered = await user.create({
      user_name: "admin",
      poswarrd: "12345678",
    });
    console.log("ID: " + adminFound.user_name);
  } catch (error) {
    console.error(error);
  }
};
