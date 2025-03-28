require("dotenv").config;
const mongoose = require("mongoose");
const SegmentCategory = require("../models/segment_category_new")(mongoose);

mongoose
  .connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const categories = [
  { category_name: "Class Room" },
  { category_name: "Self-Practice" },
  { category_name: "Practice with the Master" },
  { category_name: "Speaking Room" },
];

// Seed Function
const seedDB = async () => {
    try {
        for (const category of categories) {
          const existingCategory = await SegmentCategory.findOne({ category_name: category.category_name });
    
          if (!existingCategory) {
            await SegmentCategory.create(category);
            console.log(`Inserted: ${category.category_name}`);
          } else {
            console.log(`Already exists: ${category.category_name}`);
          }
        }
    
        console.log("Seeding completed!");
      } catch (error) {
        console.error("Seeding Error:", error);
};
}
seedDB().then(() => {
  mongoose.connection.close();
});
