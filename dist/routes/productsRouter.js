"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const products = [{ id: 1, title: 'orange' }, { id: 2, title: 'tomato' }];
exports.productsRouter = (0, express_1.Router)();
exports.productsRouter.get('/', function (req, res) {
    const param = req.query.title;
    if (param) {
        res.send(products.find(el => el.title.indexOf(param.toString()) > -1));
    }
    res.send(products);
});
exports.productsRouter.delete('/:id', function (req, res) {
    const param = req.params.id;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +param) {
            products.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
});
exports.productsRouter.post('/', function (req, res) {
    const newProduct = {
        id: new Date().getSeconds(),
        title: req.body.title
    };
    products.push(newProduct);
    res.send(204);
});
exports.productsRouter.put('/:id', function (req, res) {
    const product = products.find(el => el.id === +req.params.id);
    if (product) {
        product.title = req.body.title;
        res.send(product);
        return;
    }
    res.send(404);
});
