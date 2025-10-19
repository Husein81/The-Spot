import { PrismaClient } from "@repo/product-db";
const prisma = new PrismaClient();

export async function main() {
  // Create a test category first
  const category = await prisma.category.upsert({
    where: { slug: "test" },
    update: {},
    create: {
      name: "Test Category",
      slug: "test",
    },
  });

  console.log("✅ Category created:", category.name);

  // Dummy products
  const products = [
    {
      name: "Adidas CoreFit T-Shirt",
      shortDescription:
        "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
      description:
        "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
      price: 39.9,
      sizes: ["s", "m", "l", "xl", "xxl"],
      colors: ["gray", "purple", "green"],
      images: {
        gray: "/products/1g.png",
        purple: "/products/1p.png",
        green: "/products/1gr.png",
      },
      categorySlug: category.id,
    },
    {
      name: "Puma Ultra Warm Zip",
      shortDescription:
        "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
      description:
        "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
      price: 59.9,
      sizes: ["s", "m", "l", "xl"],
      colors: ["gray", "green"],
      images: { gray: "/products/2g.png", green: "/products/2gr.png" },
      categorySlug: category.id,
    },
    {
      name: "Nike Air Essentials Pullover",
      shortDescription:
        "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
      description:
        "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
      price: 69.9,
      sizes: ["s", "m", "l"],
      colors: ["green", "blue", "black"],
      images: {
        green: "/products/3gr.png",
        blue: "/products/3b.png",
        black: "/products/3bl.png",
      },
      categorySlug: category.id,
    },
    {
      name: "Nike Dri Flex T-Shirt",
      shortDescription:
        "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
      description:
        "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
      price: 29.9,
      sizes: ["s", "m", "l"],
      colors: ["white", "pink"],
      images: { white: "/products/4w.png", pink: "/products/4p.png" },
      categorySlug: category.id,
    },
    {
      name: "Under Armour StormFleece",
      shortDescription:
        "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
      description:
        "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
      price: 49.9,
      sizes: ["s", "m", "l"],
      colors: ["red", "orange", "black"],
      images: {
        red: "/products/5r.png",
        orange: "/products/5o.png",
        black: "/products/5bl.png",
      },
      categorySlug: category.id,
    },
    {
      name: "Nike Air Max 270",
      shortDescription:
        "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
      description:
        "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
      price: 59.9,
      sizes: ["40", "42", "43", "44"],
      colors: ["gray", "white"],
      images: { gray: "/products/6g.png", white: "/products/6w.png" },
      categorySlug: category.id,
    },
    {
      name: "Nike Ultraboost Pulse",
      shortDescription:
        "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
      description:
        "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
      price: 69.9,
      sizes: ["40", "42", "43"],
      colors: ["gray", "pink"],
      images: { gray: "/products/7g.png", pink: "/products/7p.png" },
      categorySlug: category.id,
    },
    {
      name: "Levi’s Classic Denim",
      shortDescription:
        "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
      description:
        "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
      price: 59.9,
      sizes: ["s", "m", "l"],
      colors: ["blue", "green"],
      images: { blue: "/products/8b.png", green: "/products/8gr.png" },
      categorySlug: category.id,
    },
  ];
  const count = await prisma.product.count();
  if (count > 0) return;
  // Insert products
  for (const product of products) {
    await prisma.product.create({
      data: {
        ...product,
        images: product.images,
      },
    });
  }

  console.log("✅ Seeded 8 dummy products successfully");
}
