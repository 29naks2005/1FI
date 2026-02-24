const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.emiPlan.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();

  const iphone = await prisma.product.create({
    data: {
      name: "Apple iPhone 17 Pro",
      slug: "iphone-17-pro",
      description: "Latest Apple iPhone 17 Pro with powerful performance.",
      mrp: 149900,
      basePrice: 139900,
      variants: {
        create: [
          {
            color: "Silver",
            storage: "256GB",
            imageUrl: "https://m.media-amazon.com/images/I/616-Eh2FbPL._AC_UF894,1000_QL80_.jpg",
            price: 139900,
            isDefault: true
          },
          {
            color: "Cosmic Orange",
            storage: "512GB",
            imageUrl: "https://m.media-amazon.com/images/I/71JGCn1z1TL._AC_UF894,1000_QL80_.jpg",
            price: 149900
          }
        ]
      },
      emiPlans: {
        create: [
          {
            tenureMonths: 12,
            interestRate: 0,
            monthlyAmount: 11658,
            cashback: 5000
          },
          {
            tenureMonths: 24,
            interestRate: 10.5,
            monthlyAmount: 7200,
            cashback: 0
          }
        ]
      }
    }
  });

  await prisma.product.create({
    data: {
      name: "Samsung Galaxy S24 Ultra",
      slug: "samsung-s24-ultra",
      description: "Flagship Samsung phone with premium features.",
      mrp: 129999,
      basePrice: 119999,
      variants: {
        create: [
          {
            color: "Titanium Gray",
            storage: "256GB",
            imageUrl: "https://images.samsung.com/in/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-color-titanium-gray-back-mo.jpg?imbypass=true",
            price: 119999,
            isDefault: true
          },
          {
            color: "Phantom Black",
            storage: "512GB",
            imageUrl: "https://images.samsung.com/in/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-color-titanium-black-back-mo.jpg?imbypass=true",
            price: 129999
          }
        ]
      },
      emiPlans: {
        create: [
          {
            tenureMonths: 12,
            interestRate: 0,
            monthlyAmount: 9999,
            cashback: 3000
          },
          {
            tenureMonths: 18,
            interestRate: 8.5,
            monthlyAmount: 7500,
            cashback: 0
          }
        ]
      }
    }
  });

  await prisma.product.create({
    data: {
      name: "OnePlus 12",
      slug: "oneplus-12",
      description: "High performance smartphone from OnePlus.",
      mrp: 69999,
      basePrice: 64999,
      variants: {
        create: [
          {
            color: "Emerald Green",
            storage: "128GB",
            imageUrl: "https://m.media-amazon.com/images/I/717Qo4MH97L._AC_UF1000,1000_QL80_.jpg",
            price: 64999,
            isDefault: true
          },
          {
            color: "Black",
            storage: "256GB",
            imageUrl: "https://m.media-amazon.com/images/I/71o8VehMHXL._AC_UF1000,1000_QL80_.jpg",
            price: 69999
          }
        ]
      },
      emiPlans: {
        create: [
          {
            tenureMonths: 6,
            interestRate: 0,
            monthlyAmount: 10833,
            cashback: 2000
          },
          {
            tenureMonths: 12,
            interestRate: 5.5,
            monthlyAmount: 5800,
            cashback: 0
          }
        ]
      }
    }
  });

  await prisma.product.create({
    data: {
      name: "Google Pixel 9 Pro",
      slug: "google-pixel-9-pro",
      description: "Experience the magic of Google AI with Pixel 9 Pro.",
      mrp: 109999,
      basePrice: 99999,
      variants: {
        create: [
          {
            color: "Obsidian",
            storage: "256GB",
            imageUrl: "https://rukminim2.flixcart.com/image/480/640/xif0q/mobile/t/b/i/-original-imahggexgphcbyja.jpeg?q=90",
            price: 99999,
            isDefault: true
          },
          {
            color: "Porcelain",
            storage: "256GB",
            imageUrl: "https://m.media-amazon.com/images/I/51hMSDdGAtL._AC_UF1000,1000_QL80_.jpg",
            price: 99999,
            isDefault: true
          }
        ]
      },
      emiPlans: {
        create: [
          {
            tenureMonths: 12,
            interestRate: 0,
            monthlyAmount: 8333,
            cashback: 4000
          },
          {
            tenureMonths: 12,
            interestRate: 0,
            monthlyAmount: 8333,
            cashback: 4000
          }
        ]
      }
    }
  });

  console.log("🌱 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });