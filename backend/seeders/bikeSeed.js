import Bike from "../model/bikeModel.js";
import db from "../config/config.js";

const bikeNames = [
  "Mountain Bike Pro", "Road Bike Lite", "Hybrid Bike Sport",
  "BMX Stunt Bike", "Electric Bike", "Cruiser Bike Classic",
  "Gravel Bike Adventure", "Track Bike Speed", "Folding Bike Compact",
  "Kids Bike Fun", "City Bike Urban", "Dirt Bike Offroad",
  "Fixed Gear Bike", "Cruiser Comfort", "Commuter Bike Daily",
  "Touring Bike Explorer", "Urban Commuter", "Beach Cruiser",
  "Trial Bike Extreme", "Enduro Bike All-terrain",
];

const prices = [99, 149, 199, 249, 299, 349, 399, 449, 499, 549,
  599, 649, 699, 749, 799, 849, 899, 949, 999, 1099,
  1199, 1299, 1399, 1499, 1599, 1699, 1799, 1899, 1999, 2099];

async function seedBikes() {
  try {
    await db.authenticate();
    console.log("✅ Database connected");

    // Sync database
    await db.sync();
    console.log("✅ Database synced");

    // Check existing bikes
    const existingCount = await Bike.count();
    console.log(`📊 Existing bikes: ${existingCount}`);

    // Generate 100 bikes
    const bikesToCreate = [];
    for (let i = 1; i <= 100; i++) {
      const randomName = bikeNames[Math.floor(Math.random() * bikeNames.length)];
      const randomPrice = prices[Math.floor(Math.random() * prices.length)];      
      bikesToCreate.push({
        name: `${randomName} #${i}`,
        price: randomPrice + Math.floor(Math.random() * 100)
      });
    }

    // Insert bikes
    await Bike.bulkCreate(bikesToCreate);
    console.log("✅ Successfully inserted 100 bikes!");

    // Show summary
    const totalBikes = await Bike.count();
    console.log(`📈 Total bikes in database: ${totalBikes}`);

    // Show some samples
    const samples = await Bike.findAll({ limit: 5 });
    console.log("\n📋 Sample bikes:");
    samples.forEach((bike, index) => {
      console.log(`  ${index + 1}. ${bike.name} - $${bike.price}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding bikes:", error.message);
    process.exit(1);
  }
}

seedBikes();
