import 'dotenv/config';
import express from 'express'
import mongoose from 'mongoose';
import Product from './models/product.model.js'
import productRoute from './routes/product.route.js'
import cors from 'cors';
const app = express()

app.use(cors());

fetch('https://first-crud-app-backend.onrender.com/api/products')

app.use(express.json())
// app.use(express.urlencoded({extended: false}))

app.use("/api/products", productRoute)

const PORT = process.env.PORT || 3000; // Use the port provided by the environment, or default to 3000 for local development

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Make the log dynamic too
});

app.get("/", (req, res) => {
    res.send("Hello from the other side")
}); 

mongoose.connect('mongodb+srv://2kamilhil:MK46240325b@mfirstnode.ihm5rdl.mongodb.net/Node-API?retryWrites=true&w=majority&appName=mFirstNode')
  .then(() => console.log('Connected to database'));
//   .catch(() => console.log('There was a problem'));