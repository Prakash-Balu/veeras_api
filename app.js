"use strict";
const express = require("express");
require("dotenv").config();
const Pusher = require("pusher");
const cors = require("cors");
const useragent = require("express-useragent");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const {generateEmailTemplate} = require("./service/template");



const swaggerUi = require("swagger-ui-express");
// const swaggerSpec = require('./configs/swaggerConfig');
const swaggerJsdoc = require("swagger-jsdoc");
// const { updateSwaggerServers } = require('./configs/swaggerConfig');
const constants = require("./configs/constants");
const Razorpay = require("razorpay");
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const mongooseConn = require("./configs/mongodb");
const utils = require("./utils");
module.exports = (async () => {
  const pusher = new Pusher({
    appId: process.env.PUSHER_APPID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true,
  });
  const mongoose = await mongooseConn(constants);
  const app = express();
  const server = http.createServer(app);
  const io = socketIo(server);
  app.use(express.json());
  app.use(useragent.express());
  app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );
  app.use("/", express.static(path.join(__dirname, "public")));

  app.get("/test-email", (req, res) => {
    const html = generateEmailTemplate(
      "Kumar",               
      "kumar@example.com",        
      "9876543210",
      "tamilnadu",                 
      "Yearly Plan",          
      12000                 
    );
    res.send(html); 
  });



  require("./cron")(mongoose, utils, constants);
  require("./seed/category_seed")(mongoose, utils, constants);
  const auth = require("./routes/auth")(mongoose, utils, pusher, constants);
  const adminAuth = require("./routes/admin/auth")(mongoose, utils, constants);
  const user = require("./routes/user")(mongoose, utils, constants);
  const location = require("./routes/location-price")(
    mongoose,
    utils,
    constants
  );
  const plan = require("./routes/plan")(mongoose, utils, constants);
  const segments = require("./routes/segments")(mongoose, utils, constants);
  const comments = require("./routes/comments")(mongoose, utils, constants);
  const payments = require("./routes/payment")(mongoose, utils, constants);
  const chat = require("./routes/chat")(mongoose, utils, constants);
  const adminLocation = require("./routes/admin/location-price")(
    mongoose,
    utils,
    constants
  );
  const adminPlan = require("./routes/admin/plan")(mongoose, utils, constants);
  const adminSegments = require("./routes/admin/segments")(
    mongoose,
    utils,
    constants
  );
  const apiSelfPractice = require("./routes/api")(mongoose, utils, constants);
  const adminPrice = require("./routes/admin/price")(
    mongoose,
    utils,
    constants
  );
  const practicewithmaster = require("./routes/admin/practicewithmaster")(
    mongoose,
    utils,
    constants
  );
  const practicewithmaster_customer = require("./routes/practicewith-master")(
    mongoose,
    utils,
    constants
  );
  const practiceWithMaster_watchedhistory =
    require("./routes/admin/practicewithmaster-watchedhistory")(
      mongoose,
      utils,
      constants
    );
  const PracticeWithMaster_Watchedhistory_Customer =
    require("./routes/practicewithmaster-watchedhistory")(
      mongoose,
      utils,
      constants
    );
  const bannerSection = require("./routes/admin/bannersection-new")(
    mongoose,
    utils,
    constants
  );
  const bannerSectionCustomer = require("./routes/bannersection-new")(
    mongoose,
    utils,
    constants
  );
  const fileUpload = require("./routes/admin/fileUpload-new")(
    mongoose,
    utils,
    constants
  );
  const segments_new = require("./routes/admin/segment-new")(
    mongoose,
    utils,
    constants
  );
  const segments_new_customer = require("./routes/segment-new")(
    mongoose,
    utils,
    constants
  );
  const segment_category = require("./routes/admin/segment-category-new")(
    mongoose,
    utils,
    constants
  );
  const selfPractice = require("./routes/admin/selfPractice-new")(
    mongoose,
    utils,
    constants
  );
  const classroom = require("./routes/admin/classroom-new")(
    mongoose,
    utils,
    constants
  );

  const { createToken } = require("./service/agora");
  const {email} = require('./service/email')

  app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World" });
  });

  app.use("/auth", auth, adminAuth);
  app.use("/user", user);
  app.use("/location", location, adminLocation);
  app.use("/plan", plan, adminPlan);
  app.use("/payment", payments);
  app.use("/segments", segments, adminSegments);
  app.use("/comments", comments);
  app.use("/chat", chat);
  app.use("/api", apiSelfPractice);
  app.use("/price", adminPrice);
  app.use("/practicewithmaster", practicewithmaster);
  app.use("/practicewithmaster-customer", practicewithmaster_customer);
  app.use("/practiceWithMaster_wh", practiceWithMaster_watchedhistory);
  app.use(
    "/practicewithmaster_wh_customer",
    PracticeWithMaster_Watchedhistory_Customer
  );
  app.use("/bannerSection", bannerSection);
  app.use("/bannerSectionCustomer", bannerSectionCustomer);
  app.use("/fileupload", fileUpload);
  app.use("/segments_new", segments_new);
  app.use("/segments_new_customer", segments_new_customer);
  app.use("/segment_category", segment_category);
  app.use("/selfPractice", selfPractice);
  app.use("/classroom", classroom);

  app.get("/mail",email)
  app.get("/agora/generate-token", createToken);

  // Serve Swagger documentation

  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API Documentation",
        version: "1.0.0",
        description: "A simple API documentation example",
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
    },
    apis: ["./routes/*.js", "./routes/admin/*.js"], // Adjust the path to match your project
  };

  const swaggerSpec = swaggerJsdoc(swaggerOptions);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // app.use('/api-docs', updateSwaggerServers, (req, res, next) => {
  //   swaggerUi.serve(req, res, next); // Serve Swagger UI
  // }, (req, res) => {
  //   swaggerUi.setup(req.swaggerSpec)(req, res);
  // });

  // Twilio configuration
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false,
    })
  );

//whatsApp
  app.post("/whatsapp", (req, res) => {
    const msg = req.body.msg;
    client.messages
      .create({
        from: "whatsapp:+14155238886",
        to: "whatsapp:+919750989497",
        body: msg,
        mediaUrl: [
          "https://thumbs.dreamstime.com/b/welcome-word-blue-circles-white-93627727.jpg",
        ],
      })
      .then((message) => res.send(message))
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  });


  app.get("/order", async (req, res) => {
    // setting up options for razorpay order.
    console.log(15 * 66000);
    const options = {
      amount: 50000, // Amount in paise (50000 paise = 500 INR)
      currency: "INR",
      accept_partial: false,
      expire_by: Date.now() * 15, // Optional: Unix timestamp for expiration
      notes: {
        order_id: "order_1234", // Optional: Custom note
        customer_id: "cust_5678", // Optional: Custom note
      },
      customer: {
        name: "John Doe", // Optional: Customer name
        email: "john@example.com", // Optional: Customer email
        contact: "+919896859685", // Optional: Customer phone number
      },
      description: "Payment for Order #1234",
      reminder_enable: true,
      callback_url: "http://localhost:3000/payment-success",
    };
    try {
      const response = await razorpay.paymentLink.create(options);

      res.json({
        payment_link: response.short_url,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send("Not able to create order. Please try again! ");
    }
  });

  // Socket.IO Events
  io.on("connection", (socket) => {
    console.log("New client connected");

    // Handle user login
    socket.on("userOnline", async (userId) => {
      // await User.findByIdAndUpdate(userId, { online: true, lastActive: new Date() });
      // const onlineUsers = await User.find({ online: true });
      io.emit("updateOnlineUsers", onlineUsers);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected");
      io.emit("updateOnlineUsers", onlineUsers);
    });
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server Listen Port ${process.env.PORT}`);
  });
})();
