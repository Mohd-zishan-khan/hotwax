const express = require("express");
const db = require("../config/db");

const router = express.Router();

// ✅ Get All Products
router.get("/", async (req, res) => {
  try {
    const [products] = await db.execute("SELECT * FROM products");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// ✅ Get Single Product by ID
router.get("/:id", async (req, res) => {
  try {
    const [product] = await db.execute("SELECT * FROM products WHERE product_id = ?", [req.params.id]);
    if (product.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
});

// ✅ Create a New Product
router.post("/", async (req, res) => {
  const { product_name, color, size } = req.body;
  try {
    const [result] = await db.execute(
      "INSERT INTO products (product_name, color, size) VALUES (?, ?, ?)",
      [product_name, color, size]
    );
    res.status(201).json({ message: "Product created", product_id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
});

// ✅ Update a Product
router.put("/:id", async (req, res) => {
  const { product_name, color, size } = req.body;
  try {
    const [result] = await db.execute(
      "UPDATE products SET product_name = ?, color = ?, size = ? WHERE product_id = ?",
      [product_name, color, size, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
});

// ✅ Delete a Product
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.execute("DELETE FROM products WHERE product_id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});

module.exports = router;
