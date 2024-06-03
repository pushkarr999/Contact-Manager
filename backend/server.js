const express = require("express");
const connectDb = require("../backend/config/dbConnection");
const errorHandler = require("../backend/middlewares/errorHandler");
const dotenv = require("dotenv").config();
const cors = require('cors');

connectDb();
const app = express();

const port = 5000;


app.use(cors({
  origin: 'http://localhost:4200', // Angular application URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});