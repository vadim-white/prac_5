const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { v4: uuid } = require("uuid");

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// In-memory "database"
let contacts = [];

// Get all contacts
app.get("/contacts", (req, res) => {
  res.json(contacts);
});

// Create contact
app.post("/contacts", (req, res) => {
  const contact = { id: uuid(), ...req.body };
  contacts.push(contact);
  res.json(contact);
});

// Update contact
app.put("/contacts/:id", (req, res) => {
  const id = req.params.id;
  contacts = contacts.map(c => c.id === id ? { ...c, ...req.body } : c);
  res.json({ ok: true });
});

// Delete contact
app.delete("/contacts/:id", (req, res) => {
  contacts = contacts.filter(c => c.id !== req.params.id);
  res.json({ ok: true });
});

// Start server on Render port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});