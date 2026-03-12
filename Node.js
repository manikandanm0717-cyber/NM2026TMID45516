const express = require("express");
const app = express();

app.use(express.json());

let products = [];

// Add Product
app.post("/add-product", (req, res) => {
    const { name, price, quantity } = req.body;

    const product = {
        id: Date.now(),
        name: name,
        price: price,
        quantity: quantity
    };

    products.push(product);
    res.json(product);
});

// View Products
app.get("/products", (req, res) => {
    res.json(products);
});

// Update Product
app.put("/update-product/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (product) {
        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;
        product.quantity = req.body.quantity || product.quantity;

        res.json(product);
    } else {
        res.send("Product not found");
    }
});

// Delete Product
app.delete("/delete-product/:id", (req, res) => {
    const id = parseInt(req.params.id);

    products = products.filter(p => p.id !== id);

    res.send("Product deleted");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
