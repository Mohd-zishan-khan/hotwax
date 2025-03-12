const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");
const customerRoutes = require("./routes/CustomerRoutes.js"); // ✅ Import Routes

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("E-commerce API is running...");
});

// ✅ Routes
app.use("/customers", customerRoutes); // ✅ Use Customer Routes

const productRoutes = require("./routes/productRoutes");
app.use("/products", productRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
