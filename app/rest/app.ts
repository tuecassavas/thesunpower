import 'shared/bootstrap';
import express, { json } from 'express';

import bodyParser from 'body-parser';

import { cors } from 'rest/config/cors';
import { apiLimiter } from 'rest/config/rateLimit';

import path from 'path';
import companyData from './public/assets/data/companyData.json';
import productData from './public/assets/data/productData.json'

const app = express();
app.set('trust proxy', 'loopback');
app.all('*', cors);
app.all('*', apiLimiter);
app.use(bodyParser.json({ limit: '3mb' }));

app.use(express.static(path.join('./app/rest/public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req: express.Request, res: express.Response) => {
  const data = companyData;
  res.render('index', data);
});

app.get('/products', (req: express.Request, res: express.Response) => {

  const data = productData;
  res.render('products', data);
});

app.get('/news', (req: express.Request, res: express.Response) => {
  res.render('news');
});

app.get('/v1/health', (req: express.Request, res: express.Response) => {
  res.send({ smg: 'lives' });
});

export default app;
