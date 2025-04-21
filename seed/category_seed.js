/* eslint-disable no-undef */
"use strict";

module.exports = function (mongoose, utils, constants) {
  const SegmentCategory = mongoose.model("SegmentCategory");

  const categories = [
    {
      value: 'class-room',
      label: 'Class Room',
      colorCode: '#e5f9ee',
    },
    {
      value: 'self-practice',
      label: 'Self-Practice',
      colorCode: '#c1dbe8',
    },
    {
      value: 'practice-with-master',
      label: 'Practice With the Master',
      colorCode: '#f8f6bd',
    },
    {
      value: 'speaking-room',
      label: 'Speaking Room',
      colorCode: '#f1ecff',
    },
  ];

  const ctrl = {};

  ctrl.listBanner = async () => {
    try {
      for (const category of categories) {
        const existingCategory = await SegmentCategory.findOne({ value: category.value });
        if (!existingCategory) {
          await SegmentCategory.create(category);
          console.log(`Inserted: ${category.value}`);
        } else {
          console.log(`Already exists: ${category.value}`);
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



