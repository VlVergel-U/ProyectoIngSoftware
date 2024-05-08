import server from "./app.js";
import { sequelize } from "./database/database.js";

async function main (){
  try {
    await sequelize.sync({ force: false });
    server.listen(3000, () => {
      console.log("Server listen on port", 3000);
    });
  } catch (error) {
    console.log("Unable to connect to the datatabase", error);
  }
}
main();