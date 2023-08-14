export type Product = {
  id: number
  title: string
}

const products: Product[] = [
  { id: 1, title: "orange" },
  { id: 2, title: "tomato" },
];

export const productsRepositories = {
  async getProduct(param: string | null): Promise<Product | Product[] > {
    if (param) {
        return products.filter((el) => el.title.indexOf(param.toString()) > -1);
    } else {
      return products;
    }
  },

  async removeProduct(param: number): Promise<boolean> {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +param) {
          products.splice(i,1)
          return true
        }
      }
      return false
  },

  async createProduct(title: string): Promise<Product> {
    const newProduct: Product = {
        id: new Date().getSeconds(),
        title: title
      }
      products.push(newProduct)
      return newProduct
  },

  async updateProduct(id: number, title: string): Promise<Product | undefined > {
    const product = products.find(el => el.id === id)
  
        if(product) {
          product.title = title
          return product
        }
  }
};
