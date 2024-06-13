import dotenv from 'dotenv';
dotenv.config();

const config = {
  PORT: process.env.PORT || 8000,
  DB: (process.env.NODE_ENV === 'production' ? process.env.PROD_DB : process.env.DEV_DB) || '',
  SALT: process.env.SALT || '',
  SECRET: process.env.SECRET || '',
  USERNAME: process.env.USERNAME || '',
  PASSWORD: process.env.PASSWORD || '',
  ADMINID: process.env.ADMINID || '',
 
}

export default config;