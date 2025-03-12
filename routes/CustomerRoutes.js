const express = require("express");
const db = require("../config/db");

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const [customers] = await db.execute("SELECT * FROM customers");
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error });
  }
});

// ✅ Get Single Customer by ID
router.get("/:id", async (req, res) => {
  try {
    const [customers] = await db.execute("SELECT * FROM Customers WHERE customer_id = ?", [req.params.id]);
    if (customers.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customers[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customer", error });
  }
});

// ✅ Create a New Customer
router.post("/", async (req, res) => {
  const { first_name, last_name } = req.body;
  try {
    const [result] = await db.execute(
      "INSERT INTO Customers (first_name, last_name) VALUES (?, ?)",
      [first_name, last_name]
    );
    res.status(201).json({ message: "Customer created", customer_id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Error creating customer", error });
  }
});

// ✅ Update a Customer
router.put("/:id", async (req, res) => {
  const { first_name, last_name } = req.body;
  try {
    const [result] = await db.execute(
      "UPDATE Customers SET first_name = ?, last_name = ? WHERE customer_id = ?",
      [first_name, last_name, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json({ message: "Customer updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating customer", error });
  }
});

// ✅ Delete a Customer
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.execute("DELETE FROM Customer WHERE customer_id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json({ message: "Customer deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting customer", error });
  }
});

module.exports = router;
