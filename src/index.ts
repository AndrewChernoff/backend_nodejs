import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express()
const port = process.env.PORT || 3010

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const products = [{id: 1, title: 'orange'}, {id: 2, title: 'tomato'}]

app.get('/', (req: Request, res: Response) => {
  let helloMessage = 'Hello world!!!!'
  res.send(helloMessage)
})

app.get('/products', (req: Request, res: Response) => {
  const param = req.query.title

  if(param) {
    res.send(products.find(el => el.title.indexOf(param.toString()) > -1))
  } 
  res.send(products)
})

/* app.get('/products/:productTitle', (req: Request, res: Response) => {
  let product = products.find(el => el.title === `${req.params.productTitle}`); 

  if (product){ 
  res.send(product)
  } else {
    res.status(404).send('<h1>404! Page not found</h1>');
  }

}) */

app.get('/products/:id', (req: Request, res: Response) => {
  const param = req.params.id

  if(param) {
    res.send(products.find(el => el.id === +param))
  }
})

app.delete('/products/:id', (req: Request, res: Response) => {
  const param = req.params.id

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === +param) {
        products.splice(i,1)
        res.send(204)
        return
      }
    }
    res.send(404)
})

app.post('/products', (req: Request, res: Response) => {
  const newProduct = {
    id: new Date().getSeconds(),
    title: req.body.title
  }
  products.push(newProduct)
  res.send(204);

}
)
app.put('/products/:id', (req: Request, res: Response) => {

  const product = products.find(el => el.id === +req.params.id)
  
  if(product) {
    product.title = req.body.title
    res.send(product)
    return
  }

  res.send(404);

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})