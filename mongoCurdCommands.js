const smartphones = [
  {
    brand: "Apple",
    model: "iPhone 13 Pro",
    releaseYear: 2021,
    displaySize: 6.1,
    storage: 128,
    price: 999,
  },
  {
    brand: "Samsung",
    model: "Galaxy S21",
    releaseYear: 2021,
    displaySize: 6.2,
    storage: 256,
    price: 799,
  },
  {
    brand: "Google",
    model: "Pixel 6",
    releaseYear: 2022,
    displaySize: 6.4,
    storage: 128,
    price: 699,
  },
  {
    brand: "OnePlus",
    model: "9 Pro",
    releaseYear: 2021,
    displaySize: 6.7,
    storage: 256,
    price: 899,
  },
  {
    brand: "Xiaomi",
    model: "Mi 11",
    releaseYear: 2021,
    displaySize: 6.81,
    storage: 128,
    price: 699,
  },
];

// MONGO CURD COMMANDS

// Create a database named "ecommerce"
// >> use ecommerce

// After entering the "ecommerce" database, we can create a new collection
// Here our collection name is products

// Single insert || Create
// ecommerce >> db.products.create({ name: "iPhone 10", price: 100000, category: "smartphone", active: true })

// Multiple insert || Create
// ecommerce >> db.products.insertMany([{ brand: "Google", model: "Pixel 6", releaseYear: 2022, price: 699 }, { brand: "OnePlus", model: "9 Pro", releaseYear: 2021, price: 899 }])

// Find all data || Read
// ecommerce >> db.products.find()

// Find specific data || Read
// ecommerce >> db.products.find({ brand: "Google", price: 699 })

// Use the second parameter { price: 0 } to remove the "price" field from the output data || Read
// ecommerce >> db.products.find({ brand: "Google", price: 999 }, { price: 0 })
// ecommerce >> db.products.find({ brand: "Google", price: 999 }).select({ price: 0 })

// Show a limited number of data from the beginning || Read
// ecommerce >> db.products.find({ releaseYear: 2022 }).limit(1) // Same as the findOne method

// findOne only shows the first matching data || Read
// ecommerce >> db.products.findOne({ releaseYear: 2022 }) // Same as .limit(1) method

// Skip the first 1 data and then show a limited number of data || Read
// ecommerce >> db.products.find({ releaseYear: 2022 }).limit(1).skip(1)

// Skip the first 2 data and then show a limited number of data || Read
// ecommerce >> db.products.find({ releaseYear: 2022 }).limit(1).skip(2)

// Update specific single data (based on condition) || Update
// If {warrenty: 1299} this is available in that particular object then it will only update.
// If {warrenty: 1299} this is not available in that particular object then it will added to the particular object and update
// ecommerce> db.products.updateOne({brand: "Google", price: 699},{$set: {warrenty: 1299}})

// Update specific many data (based on condition) || Update
// ecommerce > db.products.updateMany({ active: true }, { $set: { price: 599 } });

// Update all data || Update
// ecommerce > db.products.updateMany({}, { $set: { active: false } });

// Delete specific one data (based on condition) || Delete
//ecommerce> db.products.deleteOne({brand: "Xiaomi"})

// Delete specific many data (based on condition) || Delete
// ecommerce > db.products.deleteMany({ category: "smartphone" });

// Delete all data from the collection, blank object will delete all data
// ecommerce > db.products.deleteMany({  });
