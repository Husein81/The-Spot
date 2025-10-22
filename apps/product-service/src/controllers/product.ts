import { Request, Response } from "express";
import { prisma, Prisma } from "@repo/product-db";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body as Prisma.ProductCreateInput;
    const { colors, images } = data;

    if (!colors || !Array.isArray(colors) || colors.length === 0) {
      return res.status(400).json({ message: "Colors array is required!" });
    }

    if (!images || typeof images !== "object") {
      return res.status(400).json({ message: "Images object is required!" });
    }

    const missingColors = colors.filter((color) => !(color in images));

    if (missingColors.length > 0) {
      return res
        .status(400)
        .json({ message: "Missing images for colors!", missingColors });
    }

    const product = await prisma.product.create({ data });

    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: Prisma.ProductUpdateInput = req.body;

    const updateProduct = await prisma.product.update({
      where: { id },
      data,
    });

    res.status(200).json(updateProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedProduct = await prisma.product.delete({
    where: { id },
  });

  return res.status(200).json(deletedProduct);
};

export const getProducts = async (req: Request, res: Response) => {
  const { sort, category, search, page, limit } = req.query;

  const currentPage = parseInt(page as string) || 1;
  const pageSize = parseInt(limit as string) || 10;

  const orderBy = (() => {
    switch (sort) {
      case "asc":
        return {
          price: Prisma.SortOrder.asc,
        };
        break;
      case "desc":
        return { price: Prisma.SortOrder.desc };
        break;
      case "oldest":
        return { createdAt: Prisma.SortOrder.asc };
        break;
      default:
        return { createdAt: Prisma.SortOrder.desc };
        break;
    }
  })();

  const count = await prisma.product.count();
  const data = await prisma.product.findMany({
    where: {
      category: {
        slug: category as string,
      },
      name: {
        contains: search as string,
        mode: Prisma.QueryMode.insensitive,
      },
    },
    orderBy,
    skip: (currentPage - 1) * pageSize,
    take: limit ? pageSize : undefined,
  });

  return res.status(200).json({
    data,
    totalPages: Math.ceil(count / pageSize),
    currentPage,
    totalCount: data.length,
  });
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  return res.status(200).json(product);
};
