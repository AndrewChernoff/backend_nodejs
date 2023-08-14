import { client, productCollection } from "../db";

export type Product = {
    id: number
    title: string
  }
  
  /* const products: Product[] = [
    { id: 1, title: "orange" },
    { id: 2, title: "tomato" },
  ]; */
  



  export const productsRepositories = {
    async getProduct(param: string | null): Promise<Product | Product[] > {
      if (param) {
        return productCollection.find({title: {$regex: param}}).toArray()
      } else {
        return productCollection.find({}).toArray()
      }
    },
  
    async removeProduct(param: number): Promise<boolean> {

        const result = await productCollection.deleteOne({id: param})

        return result.deletedCount === 1

    },
  
    async createProduct(title: string): Promise<Product> {
      const newProduct: Product = {
          id: new Date().getSeconds(),
          title: title
        }
        
        productCollection.insertOne(newProduct)

        return newProduct

    },
  
    async updateProduct(id: number, title: string): Promise<boolean> {
    
      const result = await productCollection.updateOne({id: id}, {$set: {title: title}})

          return  result.modifiedCount === 1
    }
  };
  