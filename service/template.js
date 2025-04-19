const handlebars = require("handlebars");
const convert = require("number-to-words");
const fs = require("fs");
const path = require("path");



const generateEmailTemplate =  (
  { name, email, phone, address, plan, amount, discount }) => {
  const templatePath = path.join(__dirname, "../template/email-template.hbs");
  const templateSource = fs.readFileSync(templatePath, "utf-8");

  const template = handlebars.compile(templateSource);
  let sgst = 0;
  let cgst = 0;
  let igst = 0;

  const discountVal = discount || 0;
  const total = amount - discountVal;
  if (
    address?.toLowerCase() === "tamil nadu" ||
    address?.toLowerCase() === "tamilnadu"
  ) {
    sgst = +(total * 0.09).toFixed(2);
    cgst = +(total * 0.09).toFixed(2);
  } else {
    igst = +(total * 0.18).toFixed(2);
  }
  const now = new Date();
  const date = now.toString().split(' GMT')[0]
  
  const totalamount = (total + sgst + cgst + igst).toFixed(2);
  const amount_in_word = convert.toWords(Math.floor(totalamount));

  const context = {
    customerName: name || "user",
    email: email || "-",
    phone: phone || "-",
    address: address || "-",
    plan: plan || "-",
    amount: amount || "-",
    discount: discountVal,
    total: total,
    subtotal: amount,
    discount2: discountVal,
    totalamount: totalamount,
    sgst,
    cgst,
    igst,
    amount_in_words: amount_in_word,
    date: date
  };

  const content =  template(context);
  return {
    content,context
  };

};

module.exports = {
  generateEmailTemplate,
};
