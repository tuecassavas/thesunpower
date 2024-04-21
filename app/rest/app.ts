import 'shared/bootstrap';
import express from 'express';

import bodyParser from 'body-parser';

import { cors } from 'rest/config/cors';
import { apiLimiter } from 'rest/config/rateLimit';

const app = express();

app.set('trust proxy', 'loopback');
app.all('*', cors);
app.all('*', apiLimiter);
app.use(bodyParser.json({ limit: '3mb' }));

app.get('/v1/health', (req: express.Request, res: express.Response) => {
  res.send({ smg: 'lives' });
});



export default app;
