module.exports = (sequelize, Sequelize) => {
    const Employees = sequelize.define("employees", {
      employee_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      },
      job_title: {
        type: Sequelize.STRING
      },
      salary: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      joined_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
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
  
    return Employees;
  };