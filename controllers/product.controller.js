import Product from '../models/product.model.js';


const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}); 
        res.status(200).json(products)
      } catch (error) {
        res.status(500).json({message: error.message})
      }
}

const getProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      console.log(`Showing ${product.name}`)
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
}

const createProduct =  async (req, res) => {
    try {
      const product = await Product.create(req.body);
      console.log(`Created ${product.name}`)
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }

const updateProduct =  async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndUpdate(id, req.body);
  
      if(!product){
        return res.status(404).json({message: "Product not found"})
      }
      const updatedProduct = await Product.findById(id);
      console.log(`Updated ${updatedProduct.name}`)
      res.status(200).json(updatedProduct)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }

  const deleteProduct =  async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id)
  
      if(!product){
        return res.status(404).json({message: "Product not found"})
      }
  
      res.status(200).json("Product deleted successfully")
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }

export {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}