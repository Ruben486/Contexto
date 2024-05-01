// sintaxis valida con type: module en el package.json
import express from "express"; 
import fileUpload from "express-fileupload";
import postRoutes from "./routes/post.routes.js";

const app = express();
app.use(express.json())

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 *1024},
  useTempFiles: true,
  tempFileDir: "./upload"
}))
// CONFIGURACION DE CORS
app.use((req,res,next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  //res.append('Access-Control-Allow-Credentials', true);
  res.append('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE')
  res.append('Access-Control-Allow-Headers', 'Content-Type')
  next()
})
app.use(postRoutes);

export default app;