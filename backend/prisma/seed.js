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
      specs: [
        "Storage: 256 GB / 512 GB",
        "Color: Silver / Cosmic Orange",
        "Front Camera: 18MP",
        "Front Camera Features: 18MP front cam with autofocus, Center Stage, Night mode, HDR 5, portraits, Animoji, 4K stabilized video, spatial audio, and dual capture features.",
        "Rear Camera: 48MP + 48MP + 48MP"
      ],
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
          { tenureMonths: 3, interestRate: 0, monthlyAmount: 44967, cashback: 7500 },
          { tenureMonths: 6, interestRate: 0, monthlyAmount: 22483, cashback: 7500 },
          { tenureMonths: 12, interestRate: 0, monthlyAmount: 11242, cashback: 7500 },
          { tenureMonths: 24, interestRate: 0, monthlyAmount: 5621, cashback: 7500 },
          { tenureMonths: 36, interestRate: 10.5, monthlyAmount: 4297, cashback: 7500 },
          { tenureMonths: 48, interestRate: 10.5, monthlyAmount: 3385, cashback: 7500 },
          { tenureMonths: 60, interestRate: 10.5, monthlyAmount: 2842, cashback: 7500 },
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
      specs: [
        "Storage: 256 GB / 512 GB",
        "Color: Titanium Gray / Phantom Black",
        "Front Camera: 12MP",
        "Front Camera Features: Dual Pixel AF, Nightography, Super HDR, 4K video recording at 60fps.",
        "Rear Camera: 200MP + 50MP + 12MP + 10MP"
      ],
      variants: {
        create: [
          {
            color: "Titanium Gray",
            storage: "256GB",
            imageUrl: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/303838_7_msdywx.png?tr=w-1000",
            price: 119999,
            isDefault: true
          },
          {
            color: "Phantom Black",
            storage: "512GB",
            imageUrl: "https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/303840_7_a33yp1.png",
            price: 129999
          }
        ]
      },
      emiPlans: {
        create: [
          { tenureMonths: 3, interestRate: 0, monthlyAmount: 39999, cashback: 5000 },
          { tenureMonths: 6, interestRate: 0, monthlyAmount: 19999, cashback: 5000 },
          { tenureMonths: 12, interestRate: 0, monthlyAmount: 9999, cashback: 5000 },
          { tenureMonths: 24, interestRate: 0, monthlyAmount: 4999, cashback: 5000 },
          { tenureMonths: 36, interestRate: 10.5, monthlyAmount: 3850, cashback: 5000 },
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
      specs: [
        "Storage: 128 GB / 256 GB",
        "Color: Emerald Green / Black",
        "Front Camera: 32MP",
        "Front Camera Features: Advanced HDR, portrait mode, 4K video support, AI beautification.",
        "Rear Camera: 50MP + 64MP + 48MP Hasselblad Camera"
      ],
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
          { tenureMonths: 3, interestRate: 0, monthlyAmount: 21666, cashback: 3000 },
          { tenureMonths: 6, interestRate: 0, monthlyAmount: 10833, cashback: 3000 },
          { tenureMonths: 12, interestRate: 0, monthlyAmount: 5416, cashback: 3000 },
          { tenureMonths: 24, interestRate: 10.5, monthlyAmount: 3100, cashback: 3000 },
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
      specs: [
        "Storage: 256 GB",
        "Color: Obsidian / Porcelain",
        "Front Camera: 42MP",
        "Front Camera Features: AF, Face Unlock, Magic Eraser, Best Take, Night Sight, Super Res Zoom.",
        "Rear Camera: 50MP + 48MP + 48MP"
      ],
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
          { tenureMonths: 3, interestRate: 0, monthlyAmount: 33333, cashback: 4000 },
          { tenureMonths: 6, interestRate: 0, monthlyAmount: 16666, cashback: 4000 },
          { tenureMonths: 12, interestRate: 0, monthlyAmount: 8333, cashback: 4000 },
          { tenureMonths: 24, interestRate: 0, monthlyAmount: 4166, cashback: 4000 },
          { tenureMonths: 36, interestRate: 10.5, monthlyAmount: 3250, cashback: 4000 },
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