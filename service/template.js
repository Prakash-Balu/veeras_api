const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const generateEmailTemplate = (customerName,email,phone,address) => {
  const templatePath = path.join(__dirname, "../template/email-template.hbs");
  const templateSource = fs.readFileSync(templatePath, "utf-8");

  const template = handlebars.compile(templateSource);

  const context = {
    customerName: customerName || "user",
    email: email || "-",
    phone: phone || "-",
    address: address || "-"
  };

  return template(context);
};

module.exports = {
  generateEmailTemplate
};
