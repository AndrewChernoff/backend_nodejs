import { productsRepositories } from "./../repositories/productsRepositories";
import { NextFunction, Router } from "express";
import { body, matchedData, query, validationResult } from 'express-validator';
import express, { Request, Response } from 'express';

/* const products = [{id: 1, title: 'orange'}, {id: 2, title: 'tomato'}]*/

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

productsRouter.get("/", function (req, res) {
  const param = req.query.title;

  if (param) {
    const product = productsRepositories.getProduct(
      param?.toString() as string
    );
    res.send(product);
  }

  res.send(productsRepositories.getProduct(null));
});

productsRouter.delete("/:id", function (req, res) {
  const param = req.params.id;

  const isDeleted = productsRepositories.removeProduct(+param);
  isDeleted ? res.send(204) : res.send(404);
});


productsRouter.post("/", titleValidation, validationErrorMiddleware, function (req, res) {
  

  const product = productsRepositories.createProduct(
    req.body.title.toString() as string
  );
  if (product) {
    res.send(product);
  }
});

productsRouter.put("/:id", titleValidation, validationErrorMiddleware, function (req, res) {
  const product = productsRepositories.updateProduct(
    +req.params.id,
    req.body.title
  );

  product ? res.send(product) : res.send(404);
});
