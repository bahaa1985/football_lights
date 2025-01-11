import express from 'express';
import cors from 'cors';
import home_router from './routes/home.js';
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/default',home_router);

app.listen(5000, () => {
});