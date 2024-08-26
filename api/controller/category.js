import { StatusCodes } from "http-status-codes";
import asyncHandler from "../middleware/async-handler.js";
import Category from "../model/category.js";
import Product from "../model/product.js";
import NotFoundError from "../error/not-found.js";
import { parse } from "dotenv";

export const getCategories = asyncHandler(async(req, res) => {
    const pageSize = parseInt(req.query.pageSize) ;
    const page = Number(req.query.page) || 1;
    const limit = parseInt(req.query.pageSize) ;
    const count = await Category.countDocuments();
    const categories = await Category.find().populate('parent')
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    
    res.status(StatusCodes.OK).json({ categories, page, pages:Math.ceil( count / pageSize) });
});

export const createCategory = asyncHandler(async(req, res) => {
    const { name, parentCategory } = req.body;
    const category = await Category.create({name, parentCategory});

    res.status(StatusCodes.CREATED).json(category);
});

export const updateCategory = asyncHandler(async(req, res) => {
    const {name, parentCategory, _id} = req.body;
    const category = await Category.updateOne({_id},
    {
        name,
        parent: parentCategory
    });
    res.status(StatusCodes.OK).json({category})
});

export const deleteCategory = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if(!category)
        throw new NotFoundError("Category not found");
    await category.findByIdAndDelete(id);
    await Product.updateMany({category: id},{ $unset: {category: ""}});

    return res.status(StatusCodes.OK).send({message: "Category deleted successfully"});
})