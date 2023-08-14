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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const productsRouter_1 = require("./routes/productsRouter");
const db_1 = require("./db");
const app = (0, express_1.default)();
const port = process.env.PORT || 3010;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    let helloMessage = 'Hello world!!!!';
    res.send(helloMessage);
});
app.use('/products', productsRouter_1.productsRouter);
/* app.get('/products', (req: Request, res: Response) => {
  const param = req.query.title

  if(param) {
    res.send(products.find(el => el.title.indexOf(param.toString()) > -1))
  }
  res.send(products)
})
 */
/* app.get('/products/:id', (req: Request, res: Response) => {
  const param = req.params.id

  if(param) {
    res.send(products.find(el => el.id === +param))
  }
}) */
/* app.delete('/products/:id', (req: Request, res: Response) => {
  const param = req.params.id

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === +param) {
        products.splice(i,1)
        res.send(204)
        return
      }
    }
    res.send(404)
}) */
/* app.post('/products', (req: Request, res: Response) => {
  const newProduct = {
    id: new Date().getSeconds(),
    title: req.body.title
  }
  products.push(newProduct)
  res.send(204);

}) */
/* app.put('/products/:id', (req: Request, res: Response) => {

  const product = products.find(el => el.id === +req.params.id)
  
  if(product) {
    product.title = req.body.title
    res.send(product)
    return
  }

  res.send(404);

}) */
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.runDb)();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
startApp();
