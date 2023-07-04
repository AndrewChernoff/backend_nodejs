"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const productsRepositories_1 = require("./../repositories/productsRepositories");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
/* const products = [{id: 1, title: 'orange'}, {id: 2, title: 'tomato'}]*/
const validationErrorMiddleware = (req, res, next) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
    next();
};
exports.productsRouter = (0, express_1.Router)();
const titleValidation = (0, express_validator_1.body)('title')
    .isLength({ min: 3, max: 10 })
    .withMessage('Should be more than 3 and less than 10 symbols');
exports.productsRouter.get("/", function (req, res) {
    const param = req.query.title;
    if (param) {
        const product = productsRepositories_1.productsRepositories.getProduct(param === null || param === void 0 ? void 0 : param.toString());
        res.send(product);
    }
    res.send(productsRepositories_1.productsRepositories.getProduct(null));
});
exports.productsRouter.delete("/:id", function (req, res) {
    const param = req.params.id;
    const isDeleted = productsRepositories_1.productsRepositories.removeProduct(+param);
    isDeleted ? res.send(204) : res.send(404);
});
exports.productsRouter.post("/", titleValidation, validationErrorMiddleware, function (req, res) {
    const product = productsRepositories_1.productsRepositories.createProduct(req.body.title.toString());
    if (product) {
        res.send(product);
    }
});
exports.productsRouter.put("/:id", titleValidation, validationErrorMiddleware, function (req, res) {
    const product = productsRepositories_1.productsRepositories.updateProduct(+req.params.id, req.body.title);
    product ? res.send(product) : res.send(404);
});
