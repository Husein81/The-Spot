import { Request, Response } from "express";
import prisma from "../utils/prisma.js";
import { PaginatedProductResponse, Pagination, Product } from "../types.js";
import { date } from "zod/v4";
import NotFoundError from "../error/not-found.js";

const createProduct = async (
  req: Request<{}, {}, Product>,
  res: Response<Product | { error: string }>
): Promise<void> => {
  const { name, description, cost, price, stock, categoryId, imageUrls } =
    req.body;
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        cost,
        price,
        stock,
        categoryId,
        imageUrls,
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

const getProducts = async (
  req: Request<{}, {}, {}, Pagination>,
  res: Response<PaginatedProductResponse | { error: string }>
): Promise<void> => {
  const { searchTerm, page = "1", limit = "10" } = req.query;
  const pageNumber = parseInt(page as string);
  const pageSize = parseInt(limit as string);
  const skip = (pageNumber - 1) * pageSize;
  try {
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: {
          name: { contains: searchTerm as string, mode: "insensitive" },
        },
        skip,
        take: pageSize,
      }),
      prisma.product.count({
        where: {
          name: { contains: searchTerm as string, mode: "insensitive" },
        },
      }),
    ]);

    res.status(200).json({
      data: products,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve products" });
  }
};

const getProductById = async (
  req: Request<{ id: string }>,
  res: Response<Product | { error: string }>
): Promise<void> => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    res.status(200).json(product);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to retrieve product" });
    }
  }
};

const updateProduct = async (
  req: Request<{ id: string }, {}, Partial<Product>>,
  res: Response<Product | { error: string }>
): Promise<void> => {
  const { id } = req.params;
  const { name, description, cost, price, stock, categoryId, imageUrls } =
    req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        cost,
        price,
        stock,
        categoryId,
        imageUrls,
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response<Product | { error: string }>
): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};

export {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
