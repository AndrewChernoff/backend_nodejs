import { productsRepositories } from './../repositories/productsRepositories';
import { Router } from "express";

/* const products = [{id: 1, title: 'orange'}, {id: 2, title: 'tomato'}]*/

export const productsRouter = Router()

productsRouter.get('/', function(req, res) {
    const param = req.query.title

    if(param) {
      const product = productsRepositories.getProduct(param?.toString() as string)
      res.send(product)
    }

    res.send(productsRepositories.getProduct(null))

    /* if(param) {
      res.send(products.find(el => el.title.indexOf(param.toString()) > -1))
    } 
    res.send(products) */
  });

productsRouter.delete('/:id', function(req, res) {
    const param = req.params.id

    const isDeleted = productsRepositories.removeProduct(+param)
    isDeleted ? res.send(204) : res.send(404) 
    /* for (let i = 0; i < products.length; i++) {
      if (products[i].id === +param) {
        products.splice(i,1)
        res.send(204)
        return
      }
    }
    res.send(404) */
  });
  
productsRouter.post('/', function(req, res) {
    /* const newProduct = {
        id: new Date().getSeconds(),
        title: req.body.title
      }
      products.push(newProduct)
      res.send(204); */
      const product = productsRepositories.createProduct(req.body.title.toString() as string)
      if (product) {
        res.send(204)
      }
    });

    productsRouter.put('/:id', function(req, res) {

      const product = productsRepositories.updateProduct(+req.params.id, req.body.title )
      
      product ? res.send(product) : res.send(404)
      /* const product = products.find(el => el.id === +req.params.id)
  
        if(product) {
          product.title = req.body.title
          res.send(product)
          return
        }
      
        res.send(404); */    
    });

