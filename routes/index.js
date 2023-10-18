import express from 'express';
import AppController from '../controllers/appController';
// import EcommerceController from '../controllers/ecommerceController';
import FetchDataController from '../controllers/fetchDataController';

const Router = (app) => {
  const router = express.Router();
  app.use('/', router);

  router.get('/status', (req, res) => {
    AppController.getStatus(req, res);
  });

  router.get('/stats', (req, res) => {
    AppController.getStats(req, res);
  });

  router.post('/search', (req, res) => {
    FetchDataController.fetchData(req, res);
  });

  router.post('/clearall', (req, res) => {
    FetchDataController.clearDb(req, res);
  });

  // router.get('/search', (req, res) => {
  //   EcommerceController.getProductByName(req, res);
  // });
};

export default Router;
