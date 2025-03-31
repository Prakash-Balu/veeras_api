/* eslint-disable no-undef */
"use strict";

module.exports = function (mongoose, utils, constants) {
  const SegmentCategory = mongoose.model("SegmentCategory");

  const categories = [
    { category_name: "Class Room" },
    { category_name: "Self-Practice" },
    { category_name: "Practice with the Master" },
    { category_name: "Speaking Room" },
  ];

  const ctrl = {};

  ctrl.listBanner = async () => {
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
    } catch (err) {
      console.log("Seed Err:: -", err);
    }
  };
  ctrl.listBanner();
  return ctrl;

};



