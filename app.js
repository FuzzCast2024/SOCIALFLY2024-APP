import express from 'express';
import config from './enviorments';
import log from './src/utils/logger';
import connect from './src/config/connect';
import routes from "./src/routes";
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import http from 'http'; // Import the http module




const { PORT } = config;

const app = express();
  
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next()
});
app.use(express.json({
   parameterLimit: 100000,
   limit: '50mb',
   extended: true
 }));
 app.use(express.urlencoded({
   parameterLimit: 100000,
   limit: '50mb',
   extended: true
 }));
 app.use(cookieParser());
app.use(morgan('dev'));
 
app.use((req, res, next) => {
  res.setTimeout(120000, () => {
    res.status(500).json({ error: 'Response timeout exceeded' });
  });
  next();
});

const server = http.createServer(app); // Create an HTTP server

server.listen(8000 , () => {
   log.info(`Server is running on port ${PORT}`);
   connect();
   routes(app);
})
