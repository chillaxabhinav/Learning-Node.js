const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class cart{
    static addProduct(id, productPrice){
        // Fetch the previous cart.
        fs.readFile(p, (err, fileContent) => {
            let cart = {products : [], totalPrice : 0};
            if(!err){
                cart = JSON.parse(fileContent);
            }
            // Analyze the cart => find existing product.
            const existingProductIndex = cart.products.findIndex(prod => prod.id===id);
            console.log(existingProductIndex);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct){
                updatedProduct= {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else{
                updatedProduct = {id : id, qty : 1};
                cart.products = [...cart.products, updatedProduct];
            }
            // Analyze the cart => find existing product.
            cart.totalPrice = parseFloat(cart.totalPrice) + parseFloat(productPrice);
            fs.writeFile(p, JSON.stringify(cart) , (err) => {
                console.log(err);
            })
        })
    }

    static deleteProduct(id, productPrice){
        fs.readFile(p, (err, fileContent) => {
            if(err){
                return;
            }
            const cart = JSON.parse(fileContent);
            const updatedCart = {...cart};
            const product = updatedCart.products.find(prod => prod.id === id);
            if (!product){
                return;
            }
            const productQty = product.qty;
            updatedCart.totalPrice = updatedCart.totalPrice - (productPrice * productQty);
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log(err);
            })
        });
    }

    static getProducts(cb){
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if(err){
                cb(null);
            } else {
            cb(cart);
            }
        })
    }
}