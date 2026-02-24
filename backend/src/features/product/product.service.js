const prisma = require("../../config/prisma");

const getAllProducts = async () => {
  const products = await prisma.product.findMany({
    include: {
      variants: true,
      emiPlans: true
    }
  });

  return products;
};

const getProductBySlug = async (slug) => {
  let product = await prisma.product.findUnique({
    where: { slug },
    include: {
      variants: true,
      emiPlans: true
    }
  });
  if (!product) {
    const variant = await prisma.productVariant.findUnique({
      where: { slug },
    });

    if (variant) {
      product = await prisma.product.findUnique({
        where: { id: variant.productId },
        include: {
          variants: true,
          emiPlans: true
        }
      });
      if (product) {
        product.matchedVariantSlug = slug;
      }
    }
  }

  return product;
};

module.exports = {
  getAllProducts,
  getProductBySlug
};