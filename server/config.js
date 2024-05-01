import dotenv from 'dotenv'; 
dotenv.config();
export const MONGO_URL =  process.env.URL_MONGODB || "mongodb//127.0.0.1:27017/postDB"
export const PORT = process.env.PORT || 3005

