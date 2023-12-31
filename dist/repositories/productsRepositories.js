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
exports.productsRepositories = void 0;
const products = [
    { id: 1, title: "orange" },
    { id: 2, title: "tomato" },
];
exports.productsRepositories = {
    getProduct(param) {
        return __awaiter(this, void 0, void 0, function* () {
            if (param) {
                return products.filter((el) => el.title.indexOf(param.toString()) > -1);
            }
            else {
                return products;
            }
        });
    },
    removeProduct(param) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < products.length; i++) {
                if (products[i].id === +param) {
                    products.splice(i, 1);
                    return true;
                }
            }
            return false;
        });
    },
    createProduct(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = {
                id: new Date().getSeconds(),
                title: title
            };
            products.push(newProduct);
            return newProduct;
        });
    },
    updateProduct(id, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = products.find(el => el.id === id);
            if (product) {
                product.title = title;
                return product;
            }
        });
    }
};
