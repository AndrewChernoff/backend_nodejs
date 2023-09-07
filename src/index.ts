import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { productsRouter } from './routes/productsRouter';
import { runDb } from './db';

const app = express()
const port = process.env.PORT || 3010

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req: Request, res: Response) => {
  let helloMessage = 'Hello world!!!!'
  res.send(helloMessage)
})

app.use('/products', productsRouter);


const startApp = async() => {

  await runDb()

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

startApp()