const prisma = require("../../config/prisma");

const getAllProducts = async () => {
  const products = await prisma.product.findMany({
    include: {
      variants: true
    }
  });

  return products;
};

const getProductBySlug = async (slug) => {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      variants: true,
      emiPlans: true
    }
  });

  return product;
};

module.exports = {
  getAllProducts,
  getProductBySlug
};