import { client, productCollection } from "../db";
import { productsRepositories } from "../repositories/productsRepositories-db";

export type Product = {
    id: number
    title: string
  }


  export const productsService = {
    async getProduct(param: string | null): Promise<Product | Product[] > {
        return await productsRepositories.getProduct(param)
      
    },
  
    async removeProduct(param: number): Promise<boolean> {

        const result = await productsRepositories.removeProduct(param)

        return result

    },
  
    async createProduct(title: string): Promise<Product> {

        return await productsRepositories.createProduct(title)

    },
  
    async updateProduct(id: number, title: string): Promise<boolean> {
    
          return await productsRepositories.updateProduct(id, title)
    }
  };
  