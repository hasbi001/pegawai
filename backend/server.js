const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

const allowOrigin = ['http://localhost:3001','http://localhost:3000','http://localhost:8080'];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowOrigin.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }, // Replace with your allowed origin
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: ['X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version', 'Authorization', 'Access-Control-Allow-Origin'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "ecommerce",
    keys: ["eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5MzA2ODI1OSwiaWF0IjoxNjkzMDY4MjU5fQ.iiaX_sI75bOzQqx6x-mPNRAj2TF5X4_N8Lxd35Q47zI"], // should use as secret environment variable
    httpOnly: true,
  })
);

// sync database
const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.options('*', cors(corsOptions)); 
// simple route
require('./app/routes/api.route')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});