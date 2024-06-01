import server from "./app.js";
import { sequelize } from "./database/database.js";
import {detail}  from "./models/detail.js";
import {customer} from "./models/customer.js"

import { createCategory, createAdmin } from "./libs/initialSetUp.js";

async function main() {
  try {
    await sequelize.sync({ force: false });
    createCategory();
    createAdmin();
    server.listen(3000, () => {
      console.log("Server listen on port", 3000);
    });
  } catch (error) {
    console.log("Unable to connect to the datatabase", error);
  }
}
main();
