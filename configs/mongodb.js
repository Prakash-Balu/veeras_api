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
      require('../models/comments')(mongoose)
      require('../models/location_details')(mongoose)
      require('../models/location_prices')(mongoose)
      require('../models/plan_details')(mongoose, constants)
      require('../models/replies')(mongoose)
      require('../models/segments')(mongoose)
      require('../models/user_plans')(mongoose)
      require('../models/user_profiles')(mongoose)
      require('../models/payment')(mongoose, constants)
      require('../models/subscription')(mongoose, constants)
      require('../models/attendance')(mongoose, constants)
      require('../models/chats')(mongoose, constants)
      resolve(mongoose);
    });

    console.log("Loading MongoDB Settings ...");
  });
};
