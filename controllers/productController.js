const fs = require('fs');

const Product = JSON.parse(fs.readFileSync(`${__dirname}/../product_data.json`));

class ProductController {
  static getAllProducts(req, res) {
    console.log(req.requestTime);
    res.status(200).json({
      status: 'success',
      results: Product.length,
      data: {
        Product,
      },
    });
  }

  static getProductById(req, res) {
    console.log(req.params);
    const id = req.params.id * 1;
    const { products } = Product;
    const product = products.find((el) => el.id === id);

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  }
}

export default ProductController;
