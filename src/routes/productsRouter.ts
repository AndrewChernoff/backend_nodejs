import { Router } from "express";

const products = [{id: 1, title: 'orange'}, {id: 2, title: 'tomato'}]


export const productsRouter = Router()

productsRouter.get('/', function(req, res) {
    const param = req.query.title

    if(param) {
      res.send(products.find(el => el.title.indexOf(param.toString()) > -1))
    } 
    res.send(products)
  });

productsRouter.delete('/:id', function(req, res) {
    const param = req.params.id

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === +param) {
        products.splice(i,1)
        res.send(204)
        return
      }
    }
    res.send(404)
  });
  
productsRouter.post('/', function(req, res) {
    const newProduct = {
        id: new Date().getSeconds(),
        title: req.body.title
      }
      products.push(newProduct)
      res.send(204);
    });

    productsRouter.put('/:id', function(req, res) {
        const product = products.find(el => el.id === +req.params.id)
  
        if(product) {
          product.title = req.body.title
          res.send(product)
          return
        }
      
        res.send(404);    
    });

