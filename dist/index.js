"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3010;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
const products = [{ id: 1, title: 'orange' }, { id: 2, title: 'tomato' }];
app.get('/', (req, res) => {
    let helloMessage = 'Hello world!!!!';
    res.send(helloMessage);
});
app.get('/products', (req, res) => {
    const param = req.query.title;
    if (param) {
        res.send(products.find(el => el.title.indexOf(param.toString()) > -1));
    }
    res.send(products);
});
/* app.get('/products/:productTitle', (req: Request, res: Response) => {
  let product = products.find(el => el.title === `${req.params.productTitle}`);

  if (product){
  res.send(product)
  } else {
    res.status(404).send('<h1>404! Page not found</h1>');
  }

}) */
app.get('/products/:id', (req, res) => {
    const param = req.params.id;
    if (param) {
        res.send(products.find(el => el.id === +param));
    }
});
app.delete('/products/:id', (req, res) => {
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
app.post('/products', (req, res) => {
    const newProduct = {
        id: new Date().getSeconds(),
        title: req.body.title
    };
    products.push(newProduct);
    res.send(204);
});
app.put('/products/:id', (req, res) => {
    const product = products.find(el => el.id === +req.params.id);
    if (product) {
        product.title = req.body.title;
        res.send(product);
        return;
    }
    res.send(404);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
