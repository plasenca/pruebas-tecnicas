import express, { json } from 'express';

const app = express();

app.use(json());

const products = [];

app.get('api/product', (res, req) => {
  res.json(products);
});

app.post('api/product', (res, req) => {

});