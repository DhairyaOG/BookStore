import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import authRoute from './routes/authRoute.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(234).send('Custom Status OK');
});

app.use('/books', booksRoute);
app.use('/auth', authRoute); 
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
