import { StatusCodes } from "http-status-codes";
import asyncHandler from "../middleware/async-handler.js";
import Category from "../model/category.js";
import Product from "../model/product.js";
import NotFoundError from "../error/not-found.js";

export const getCategories = asyncHandler(async (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 1;
  const page = parseInt(req.query.page);
  const searchTerm = req.query.searchTerm
    ? { name: { $regex: req.query.searchTerm, $options: "i" } }
    : {};

  const totalCount = await Category.countDocuments(searchTerm);

  const sort = req.query.sort || "createdAt";

  const order = req.query.order || "desc";

  const categories = await Category.find(searchTerm)
    .sort({ [sort]: order })
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  res.status(StatusCodes.OK).json({
    categories,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
  });
});

export const createCategory = asyncHandler(async (req, res) => {
  const { name, parentCategory } = req.body;
  const category = await Category.create({ name, parentCategory });

  res.status(StatusCodes.CREATED).json(category);
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) throw new NotFoundError("Category not found");
  category.name = req.body.name || category.name;
  category.imageUrls = req.body.imageUrls || category.imageUrls;
  const updated = await category.save();
  res.status(StatusCodes.OK).json(updated);
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category) throw new NotFoundError("Category not found");

  await category.deleteOne();
  await Product.updateMany({ category: id }, { $unset: { category: "" } });

  return res
    .status(StatusCodes.OK)
    .send({ message: "Category deleted successfully" });
});

export const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) throw new NotFoundError("Category not found");
  res.status(StatusCodes.OK).json(category);
});
