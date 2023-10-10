import express from 'express';
import AppController from '../controllers/appController';
import ProductController from '../controllers/productController';

const Router = (app) => {
  const router = express.Router();
  app.use('/', router);

  router.get('/status', (req, res) => {
    AppController.getStatus(req, res);
  });

  router.get('/api/v1/products', (req, res) => {
    ProductController.getAllProducts(req, res);
  });

  router.get('/api/v1/products/:id([0-9]+)', (req, res) => {
    ProductController.getProductById(req, res);
  });
};

export default Router;
