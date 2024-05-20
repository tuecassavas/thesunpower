import 'shared/bootstrap';
import express from 'express';

import bodyParser from 'body-parser';

import { cors } from 'rest/config/cors';
import { apiLimiter } from 'rest/config/rateLimit';

import path from 'path';

const app = express();

app.use(express.static(path.join( './app/rest/public')));
app.set('views','./app/rest/views');
app.set('view engine','ejs');

app.set('trust proxy', 'loopback');
app.all('*', cors);
app.all('*', apiLimiter);
app.use(bodyParser.json({ limit: '3mb' }));

app.get('/', (req: express.Request, res: express.Response) => {
  res.render('index');
});
app.get('/products', (req: express.Request, res: express.Response) => {
  res.render('products');
});
app.get('/news', (req: express.Request, res: express.Response) => {
  res.render('news');
});

app.get('/v1/health', (req: express.Request, res: express.Response) => {
  res.send({ smg: 'lives' });
});



export default app;
