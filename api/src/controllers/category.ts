import { Request, Response } from "express";
import prisma from "../utils/prisma.js";
import NotFoundError from "../error/not-found.js";

const createCategory = async (req: Request, res: Response) => {
  const { name, imageUrl } = req.body;

  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
        imageUrl,
      },
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to create category" });
  }
};

const getCategories = async (req: Request, res: Response) => {
  const { searchTerm, page = "1", limit = "10" } = req.query;

  const pageNumber = parseInt(page as string);
  const pageSize = parseInt(limit as string);
  const skip = (pageNumber - 1) * pageSize;

  try {
    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        where: {
          name: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        skip,
        take: pageSize,
      }),
      prisma.category.count({
        where: {
          name: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      }),
    ]);

    res.status(200).json({
      data: categories,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundError("Category not found");
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch category" });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, imageUrl } = req.body;

  try {
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name,
        imageUrl,
      },
    });

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to update category" });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedCategory = await prisma.category.delete({
      where: { id },
    });

    res.status(200).json(deletedCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category" });
  }
};

export {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
