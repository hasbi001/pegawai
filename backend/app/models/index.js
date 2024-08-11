const { FOREIGNKEYS } = require("sequelize/lib/query-types");
const dbConfig = require("../config/database.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employees = require("./employees.js")(sequelize, Sequelize);
db.sales = require("./sales.js")(sequelize, Sequelize);
db.users = require("./users.js")(sequelize, Sequelize);

module.exports = db;