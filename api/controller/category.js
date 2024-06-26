import { StatusCodes } from "http-status-codes";
import asyncHandler from "../middleware/async-handler.js";
import Category from "../model/category.js";

export const getCategories = asyncHandler(async(req, res) => {
    const pageSize = 8;
    const page = Number(req.query.page) || 1;
    const limit = req.query.isAdmin === 'true' ? 100000 : 10
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
    const {_id} = req.query;

    await Category.deleteOne({_id});
    res.status(StatusCodes.OK).json('Ok');
})