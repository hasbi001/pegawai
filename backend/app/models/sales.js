module.exports = (sequelize, Sequelize) => {
  const Sales = sequelize.define("sales", {
    sales_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    employeeId: {
      type: Sequelize.INTEGER
    },
    sales: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    }
  });

  return Sales;
};