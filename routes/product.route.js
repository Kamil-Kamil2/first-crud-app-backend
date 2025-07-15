import express from 'express'
const router = express.Router();
import Product from '../models/product.model.js';
import {getProducts, getProduct, createProduct, updateProduct, deleteProduct} from '../controllers/product.controller.js';

router.get('/', getProducts);
router.get('/:id', getProduct)

router.post("/", createProduct)

router.put("/:id", updateProduct)

router.delete("/:id", deleteProduct)

export default router;