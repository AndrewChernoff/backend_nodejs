"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const service_1 = require("../service/service");
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
    return __awaiter(this, void 0, void 0, function* () {
        const param = req.query.title;
        const product = yield service_1.productsService.getProduct(param === null || param === void 0 ? void 0 : param.toString());
        res.send(product);
    });
});
exports.productsRouter.delete("/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const param = req.params.id;
        const isDeleted = yield service_1.productsService.removeProduct(+param);
        isDeleted ? res.send(204) : res.send(404);
    });
});
exports.productsRouter.post("/", titleValidation, validationErrorMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield service_1.productsService.createProduct(req.body.title.toString());
        if (product) {
            res.send(product);
        }
    });
});
exports.productsRouter.put("/:id", titleValidation, validationErrorMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield service_1.productsService.updateProduct(+req.params.id, req.body.title);
        product ? res.send(product) : res.send(404);
    });
});
