"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const productsRepositories_1 = require("./../repositories/productsRepositories");
const express_1 = require("express");
/* const products = [{id: 1, title: 'orange'}, {id: 2, title: 'tomato'}]*/
exports.productsRouter = (0, express_1.Router)();
exports.productsRouter.get('/', function (req, res) {
    const param = req.query.title;
    if (param) {
        const product = productsRepositories_1.productsRepositories.getProduct(param === null || param === void 0 ? void 0 : param.toString());
        res.send(product);
    }
    res.send(productsRepositories_1.productsRepositories.getProduct(null));
    /* if(param) {
      res.send(products.find(el => el.title.indexOf(param.toString()) > -1))
    }
    res.send(products) */
});
exports.productsRouter.delete('/:id', function (req, res) {
    const param = req.params.id;
    const isDeleted = productsRepositories_1.productsRepositories.removeProduct(+param);
    isDeleted ? res.send(204) : res.send(404);
    /* for (let i = 0; i < products.length; i++) {
      if (products[i].id === +param) {
        products.splice(i,1)
        res.send(204)
        return
      }
    }
    res.send(404) */
});
exports.productsRouter.post('/', function (req, res) {
    /* const newProduct = {
        id: new Date().getSeconds(),
        title: req.body.title
      }
      products.push(newProduct)
      res.send(204); */
    const product = productsRepositories_1.productsRepositories.createProduct(req.body.title.toString());
    if (product) {
        res.send(204);
    }
});
exports.productsRouter.put('/:id', function (req, res) {
    const product = productsRepositories_1.productsRepositories.updateProduct(+req.params.id, req.body.title);
    product ? res.send(product) : res.send(404);
    /* const product = products.find(el => el.id === +req.params.id)

      if(product) {
        product.title = req.body.title
        res.send(product)
        return
      }
    
      res.send(404); */
});
