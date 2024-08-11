const logger = require("../helpers/writelog");
const db = require("../models");
const Employees = db.employees;
const Op = db.Sequelize.Op;

// Create and Save a new Employees
exports.create = (req, res) => {
    
    const today = new Date();
    const Y = today.getFullYear();
    let m = today.getMonth() + 1; // Months start at 0!
    let d = today.getDate();

    // Create a Product
    const data = {
        name: req.body.name,
        job_title: req.body.job_title,
        salary: req.body.salary,
        department: req.body.department,
        joined_date: req.body.joined_date,
        createdAt: Y+"-"+m+"-"+d,
        updatedAt: Y+"-"+m+"-"+d,
    };

    // Save Product in the database
    Employees.create(data)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the employee data."
      });
    });
};

// Retrieve all Employees from the database.
exports.findAll = (req, res) => {
    var condition=null;
    
    const name = req.body.name;
    logger.writeToLog(name);
    var condName = name ? { name: { [Op.like]: `%${name}%` } } : null;
    const jobtitle = req.body.job_title;
    var job = jobtitle ? { job_title: { [Op.like]: `%${jobtitle}%` } } : null;
    const gaji = req.body.salary;
    var conGaji = gaji ? { salary: { [Op.like]: `%${gaji}%` } } : null;
    const divisi = req.body.department;
    var conDivisi = divisi ? { department: { [Op.like]: `%${divisi}%` } } : null;
    
    if (condName != null || job != null) {
        condition = {
            [Op.and]: [
                condName,
                job,
                conGaji,
                conDivisi
            ]
        }
    }

    Employees.findAll({ where: condition
        }).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving employees."
            });
        });
};

// Find a single Employee with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Employees.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find employee with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving employee with id=" + id
        });
      });
};

// Update a Employee by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Employees.update(req.body, {
        where: { employee_id: id }
    })
    .then(num => {
    if (num == 1) {
        res.send({
            message: "Employee was updated successfully."
        });
    } else {
        res.send({
            message: `Cannot update employee with id=${id}. Maybe employee was not found or req.body is empty!`
        });
    }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating employee with id=" + id
        });
    });
};

// Delete a Employee with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Employees.destroy({
      where: { employee_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "employee was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete employee with id=${id}. Maybe employee was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete employee with id=" + id
        });
      });
};


exports.datatables = async (req, res) => {
  var condition=null;
  
  const search = req.body.search['value'];
  const start = req.body.start;
  const length = req.body.length;
  const draw = req.body.draw;
  var kolom = ['name', 'job_title', 'salary', 'department'];
  
  var condName = { name: { [Op.like]: `%${search}%` } } ;
  var job = { job_title: { [Op.like]: `%${search}%` } };
  var conGaji = { salary: { [Op.like]: `%${search}%` } };
  var conDivisi = { department: { [Op.like]: `%${search}%` } };
  
  if (search != '') {
      condition = {
          [Op.or]: [
              condName,
              job,
              conGaji,
              conDivisi
          ]
      }
  }

  const totalRecords = await Employees.count();
  const filteredRecords = await Employees.count({ where: condition });

  const data = await Employees.findAll({ 
    where: condition,
    order: [ 
      [ kolom[req.body.order[0]['column']],req.body.order[0]['dir'] ] 
    ], 
    offset:parseInt(start), 
    limit:parseInt(length) 
  });

  res.send({
    draw: parseInt(draw),
    recordsTotal: totalRecords,
    recordsFiltered: filteredRecords,
    data: data
  });
};