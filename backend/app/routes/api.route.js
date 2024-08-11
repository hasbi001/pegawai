const { verifyuser,authjwt } = require("../middleware");
const employeesController = require("../controllers/employees.controller");
const salesController = require("../controllers/sales.controller");
const authController = require("../controllers/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // Izinkan semua origin
        res.header("Access-Control-Allow-Credentials", "true"); // Izinkan semua origin
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        res.header("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version")
        
        next();
    });

    // api auth  
    app.post(
        "/api/auth/signup",
        [
        verifyuser.checkDuplicateUsernameOrEmail
        ],
        authController.signup
    );

    app.post("/api/auth/signin", authController.signin);

    app.post("/api/auth/signout", authController.signout);
    
    

    // api employees
    app.post(
        "/api/employees/list", 
        [authjwt.verifyToken],
        employeesController.findAll
      );
    
      app.post(
        "/api/employees/create",
        [authjwt.verifyToken],
        employeesController.create
      );
    
      app.get(
        "/api/employees/view/:id",
        [authjwt.verifyToken],
        employeesController.findOne
      );
    
    app.put(
        "/api/employees/update/:id",
        [authjwt.verifyToken],
        employeesController.update
    );

    app.delete(
        "/api/employees/delete/:id",
        [authjwt.verifyToken],
        employeesController.delete
    );

    // api sales
    app.post(
        "/api/sales/list", 
        [authjwt.verifyToken],
        salesController.findAll
      );
    
      app.post(
        "/api/sales/create",
        [authjwt.verifyToken],
        salesController.create
      );
    
      app.get(
        "/api/sales/view/:id",
        [authjwt.verifyToken],
        salesController.findOne
      );
    
    app.put(
        "/api/sales/update/:id",
        [authjwt.verifyToken],
        salesController.update
    );

    app.delete(
        "/api/sales/delete/:id",
        [authjwt.verifyToken],
        salesController.delete
    );
};