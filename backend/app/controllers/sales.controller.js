const { Model } = require("sequelize");
const logger = require("../helpers/writelog");
const db = require("../models");
const Sales = db.sales;
const Employees = db.employees;
const Op = db.Sequelize.Op;

// Create and Save a new Sales
exports.create = (req, res) => {
    
    const today = new Date();
    const Y = today.getFullYear();
    let m = today.getMonth() + 1; // Months start at 0!
    let d = today.getDate();

    // Create a Product
    const data = {
        employeeId: req.body.employeeId,
        sales: req.body.sales,
        createdAt: Y+"-"+m+"-"+d,
        updatedAt: Y+"-"+m+"-"+d,
    };

    // Save Product in the database
    Sales.create(data)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the sales data."
      });
    });
};

// Retrieve all Sales from the database.
exports.findAll = (req, res) => {
    // var condition=null;
    
    // const employeeId = req.body.employeeId;
    // logger.writeToLog(employeeId);
    // var condemployeeId = employeeId ? { employeeId: { [Op.eq]: employeeId } } : null;
    // const sales = req.body.sales;
    // var conSales = sales ? { sales: { [Op.eq]: sales } } : null;
    
    // if (employeeId != null || sales != null) {
    //     condition = {
    //         [Op.and]: [
    //             condemployeeId,
    //             conSales
    //         ]
    //     }
    // }

    // Sales.findAll({ 
    //       where: condition,
    //       include:[{
    //         model: Employees,
    //         required:true
    //       }]
    //     }).then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //             err.message || "Some error occurred while retrieving sales."
    //         });
    //     });

    db.sequelize.query(
      "SELECT s.*,e.name FROM sales s INNER JOIN employees e ON s.employeeId=e.employee_id",
      { type: db.sequelize.QueryTypes.SELECT }
    )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Terjadi kesalahan saat mengambil data penjualan."
      });
    });
};

// Find a single Sales with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Sales.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find sales with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving sales with id=" + id
        });
      });
};

// Update a sales by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Sales.update(req.body, {
        where: { sales_id: id }
    })
    .then(num => {
    if (num == 1) {
        res.send({
            message: "Sales was updated successfully."
        });
    } else {
        res.send({
            message: `Cannot update sales with id=${id}. Maybe sales was not found or req.body is empty!`
        });
    }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating sales with id=" + id
        });
    });
};

// Delete a sales with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Sales.destroy({
      where: { sales_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "sales was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete sales with id=${id}. Maybe sales was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete sales with id=" + id
        });
      });
};
