const products = [
  { id: 1, title: "orange" },
  { id: 2, title: "tomato" },
];

export const productsRepositories = {
  getProduct(param: string | null) {
    if (param) {
      return products.find((el) => el.title.indexOf(param.toString()) > -1);
    } else {
      return products;
    }
  },

  removeProduct(param: number) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +param) {
          products.splice(i,1)
          return true
        }
      }
      return false
  },

  createProduct(title: string) {
    const newProduct = {
        id: new Date().getSeconds(),
        title: title
      }
      products.push(newProduct)
      return newProduct
  },

  updateProduct(id: number, title: string) {
    const product = products.find(el => el.id === id)
  
        if(product) {
          product.title = title
          return product
        }
  }
};
