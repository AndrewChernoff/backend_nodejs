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
const db_1 = require("../db");
/* const products: Product[] = [
  { id: 1, title: "orange" },
  { id: 2, title: "tomato" },
]; */
exports.productsRepositories = {
    getProduct(param) {
        return __awaiter(this, void 0, void 0, function* () {
            if (param) {
                return db_1.productCollection.find({ title: { $regex: param } }).toArray();
            }
            else {
                return db_1.productCollection.find({}).toArray();
            }
        });
    },
    removeProduct(param) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.productCollection.deleteOne({ id: param });
            return result.deletedCount === 1;
        });
    },
    createProduct(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = {
                id: new Date().getSeconds(),
                title: title
            };
            db_1.productCollection.insertOne(newProduct);
            return newProduct;
        });
    },
    updateProduct(id, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.productCollection.updateOne({ id: id }, { $set: { title: title } });
            return result.modifiedCount === 1;
        });
    }
};
