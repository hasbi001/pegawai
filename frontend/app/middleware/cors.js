// middleware/cors.js
const cors = require('cors');

const corsOptions = {
  origin: '*', // You can set this to a specific domain or '*' for all
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['X-CSRF-Token', 'X-Requested-With', 'Accept', 'Content-Type', 'Authorization'],
  credentials: true,
};

export default cors(corsOptions);
