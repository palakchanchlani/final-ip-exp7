const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Dummy product data (you can replace it with a database later)
const products = [
  { id: 1, name: 'Laptop', price: 1000, category: 'Electronics' },
  { id: 2, name: 'Phone', price: 500, category: 'Electronics' },
  { id: 3, name: 'Chair', price: 150, category: 'Furniture' },
  { id: 4, name: 'Table', price: 200, category: 'Furniture' },
  { id: 5, name: 'Headphones', price: 100, category: 'Accessories' }
];

// Endpoint to get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Endpoint to get a specific product by ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Endpoint to search products by name or category
app.get('/search', (req, res) => {
  const { name, category } = req.query;
  let filteredProducts = products;

  if (name) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (category) {
    filteredProducts = filteredProducts.filter(p =>
      p.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  res.json(filteredProducts);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
