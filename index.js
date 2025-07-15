import express from 'express'
import mongoose from 'mongoose';
import Product from './models/product.model.js'
import productRoute from './routes/product.route.js'
const app = express()

app.use(express.json())
// app.use(express.urlencoded({extended: false}))

app.use("/api/products", productRoute)

app.listen(3000, () =>{
    console.log('Server is running on port 3000')
});

app.get("/", (req, res) => {
    res.send("Hello from the other side")
}); 

mongoose.connect('mongodb+srv://2kamilhil:MK46240325b@mfirstnode.ihm5rdl.mongodb.net/Node-API?retryWrites=true&w=majority&appName=mFirstNode')
  .then(() => console.log('Connected to database'));
//   .catch(() => console.log('There was a problem'));