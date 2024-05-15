import{ category } from "../models/category.js"

export const createCategory= async () =>{
    try{
        const count = await category.count();
        if(count > 0)return;

        const categoryCreate=[{Trademark:"manijas"},{Trademark:"cauchos"},{Trademark:"pines"}];
        await category.bulkCreate(categoryCreate)

        const createdCategory= await category.findAll();
        console.log("categorias creadas con exito");
        createdCategory.forEach((category) => {
            console.log("ID: "+category.id+", Nombre: "+category.name)
        });
    }catch(error){
        console.error(error);
    };
};