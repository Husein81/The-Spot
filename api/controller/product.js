import { StatusCodes } from "http-status-codes";
import asyncHandler from "../middleware/async-handler.js";
import Product from "../model/product.js";
import { NotFoundError } from "../error/index.js";

export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
});

export const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize);
  const skip = (page - 1) * pageSize;

  const searchTerm = req.query.searchTerm
    ? { title: { $regex: req.query.searchTerm, $options: "i" } }
    : {};

  const totalProducts = await Product.countDocuments(searchTerm);
  const totalPages = Math.ceil(totalProducts / pageSize);

  const sort = req.query.sort || "createdAt";

  const order = req.query.order === "asc" ? 1 : -1;

  const products = await Product.find(searchTerm)
    .sort({ [sort]: order })
    .skip(skip)
    .limit(pageSize)
    .lean();

  res.status(StatusCodes.OK).json({
    products,
    totalPages,
    currentPage: page,
    totalCount: totalProducts,
  });
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new NotFoundError("Product not found");

  res.status(StatusCodes.OK).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    throw new NotFoundError("Product not found");
  }

  product.title = req.body.title || product.title;
  product.cost = req.body.cost || product.cost;
  product.price = req.body.price || product.price;
  product.description = req.body.description || product.description;
  product.imageUrls = req.body.imageUrls || product.imageUrls;
  product.quantity = req.body.quantity || product.quantity;
  product.updatedAt = Date.now();

  const updated = await product.save();
  res.status(StatusCodes.OK).json(updated);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new NotFoundError("product not found");
  }

  await Product.deleteOne({ _id: product._id });
  res.status(StatusCodes, OK).json({ message: "Product Deleted" });
});
