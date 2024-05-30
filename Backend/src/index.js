import server from "./app.js";
import { sequelize } from "./database/database.js";
import { createCategory, createAdmin } from "./libs/initialSetUp.js";


const createTables = async () => {
  await sequelize.sync({ force: true });
};

async function main() {
  try {
    createTables().then(() => {
      createCategory();
      createAdmin();
    });
    server.listen(3000, () => {
      console.log("Server listen on port", 3000);
    });
  } catch (error) {
    console.log("Unable to connect to the datatabase", error);
  }
}
main();
