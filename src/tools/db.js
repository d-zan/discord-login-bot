const {GoodDB,JSONDriver} = require("good.db");
const db = new GoodDB(new JSONDriver({path:"src/tools/database.json"}));
module.exports = db;