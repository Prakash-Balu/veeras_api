/**
 * Project          : nodejs_basic
 * Module           : Mongodb config
 * Source filename  : mongodb.js
 * Description      : Mongodb related configuration
 * Author           : FlipFlop Infotech < flipflopinfotech@gmailin.com>
 * Copyright        : Copyright © 2019, True Friend
 *                    Written under contract by FlipFlop Infotech
 */
"use strict";

const mongoose = require("mongoose");

module.exports = (constants) => {
  return new Promise((resolve) => {
    //added to avoid mongoose Promise warning
    mongoose.Promise = global.Promise;

    // Connect to MongoDB
    mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection;
    db.on("connected", console.info.bind(console, "MongoDB connected:"));
    db.on("error", console.error.bind(console, "MongoDB error:"));
    db.on("reconnected", console.warn.bind(console, "MongoDB reconnected:"));
    db.once("open", function callback() {
      console.log("Database connection to MongoDB opened.");
      require('../models/user')(mongoose)
      require('../models/loginHistory')(mongoose, constants)
      require('../models/sessionHistory')(mongoose, constants)
      require('../models/location_details')(mongoose)
      require('../models/location_prices')(mongoose)
      require('../models/plan_details')(mongoose, constants)
      require('../models/locations')(mongoose) // New Files
      require('../models/plans')(mongoose) // New Files
      require('../models/locationPlans')(mongoose) // New Files
      require('../models/planprices')(mongoose) // New Files
      require('../models/user_plans')(mongoose)
      require('../models/user_profiles')(mongoose)
      require('../models/payment')(mongoose, constants)
      require('../models/payment_new')(mongoose, constants)
      require('../models/subscription')(mongoose, constants)
      require('../models/attendance')(mongoose, constants)
      require('../models/register')(mongoose, constants)
      require('../models/notifications')(mongoose, constants)
      require('../models/practicewithmaster')(mongoose)
      require('../models/banner')(mongoose)
      require('../models/segment_category_new')(mongoose)
      require('../models/segment_new')(mongoose)
      require('../models/selfpractice_new')(mongoose)
      require('../models/classroom_new')(mongoose)
      resolve(mongoose);
    });

    console.log("Loading MongoDB Settings ...");
  });
};
