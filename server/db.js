import mongoose from "mongoose"
import { MONGO_URL } from './config.js'

export async function connectDB() {
  try {
    const db = await mongoose.connect(MONGO_URL)  
    console.log('Conected to ',db.connection.name)
  } catch (error) {
    console.log(error)
  }
};

