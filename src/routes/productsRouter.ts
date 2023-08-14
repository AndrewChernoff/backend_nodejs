import { Product } from "./../repositories/productsRepositories";
import { NextFunction, Router } from "express";
import { body, matchedData, query, validationResult } from 'express-validator';
import express, { Request, Response } from 'express';
import { productsRepositories } from "../repositories/productsRepositories-db";


const validationErrorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
    }
    next()
}

export const productsRouter = Router();

const titleValidation = body('title')
.isLength({min: 3, max: 10})
.withMessage('Should be more than 3 and less than 10 symbols')

productsRouter.get("/", async function(req, res) {
  const param = req.query.title;
    
    const product: Product | Product[] = await productsRepositories.getProduct(
      param?.toString() as string
    );
    
    res.send(product);

});


productsRouter.delete("/:id", async function (req, res) {
  const param = req.params.id;

  const isDeleted: boolean = await productsRepositories.removeProduct(+param);
  isDeleted ? res.send(204) : res.send(404);
});


productsRouter.post("/", titleValidation, validationErrorMiddleware, async function (req, res) {
  
  const product: Product = await productsRepositories.createProduct(
    req.body.title.toString() as string
  );
  if (product) {
    res.send(product);
  }
});

productsRouter.put("/:id", titleValidation, validationErrorMiddleware, async function (req, res) {
  const product: /* Product | undefined | */ boolean = await productsRepositories.updateProduct(
    +req.params.id,
    req.body.title
  );

  product ? res.send(product) : res.send(404);
});