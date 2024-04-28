import { StatusCodes } from "http-status-codes";
import asyncHandler from "../middleware/async-handler.js";
import Product from "../model/product.js";
import { NotFoundError } from "../error/index.js";

export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  
  res.status(StatusCodes.CREATED).json({ product });
});



export const getProducts = asyncHandler(async(req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = req.query.isAdmin === 'true' ? 100000 : 8;
  const skip = (page - 1) * limit;
  
  const searchTerm = req.query.searchTerm
  ? { title: { $regex: req.query.searchTerm, $options: "i" } }
  : {};
  
  const totalProducts = await Product.countDocuments(searchTerm);
  const totalPages = Math.ceil(totalProducts / limit);


  const sort = req.query.sort || 'createdAt';
        
  const order = req.query.order || 'desc';

  const products = await Product.find(searchTerm)
    .sort({ [sort]: order})
    .skip(skip)
    .limit(limit)
    .lean();

  res.status(StatusCodes.OK).json({ 
    products,
    totalPages,
    currentPage: page,
    totalCount: totalProducts,
   });
});

export const getProduct = asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id);
  if(!product)
    throw new NotFoundError("Product not found");

  res.status(StatusCodes.OK).json( product );
})

export const updateProduct = asyncHandler(async(req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if(!product){
    throw new NotFoundError("Listing not found");
  }

  const updated = await Product.findByIdAndUpdate(id, req.body,{
    new: true
  });

  res.status(StatusCodes.OK).json( updated );
});

export const deleteProduct = asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id);
    if(!product){
      throw new NotFoundError("product not found");
    }

    await Product.deleteOne({ _id: product._id });
    res.status(StatusCodes,OK).json({ message: "Product Deleted" });
});

