const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node-store", "root", "dima893201", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
