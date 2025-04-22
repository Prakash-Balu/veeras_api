const handlebars = require("handlebars");
const convert = require("number-to-words");
const fs = require("fs");
const path = require("path");

const generateEmailTemplate = ({
  name,
  email,
  phone,
  state,
  plan,
  amount,
  discount,
  currencyCode,
  countryFlag,
  country,
}) => {
  const templatePath = path.join(__dirname, "../template/email-template.hbs");
  const templateSource = fs.readFileSync(templatePath, "utf-8");

  const template = handlebars.compile(templateSource);
  let sgst = 0;
  let cgst = 0;
  let igst = 0;

  const discountVal = discount || 0;
  const total = amount - discountVal;
  if (
    state?.toLowerCase() === "tamil nadu" ||
    state?.toLowerCase() === "tamilnadu"
  ) {
    sgst = +(total * 0.09).toFixed(2);
    cgst = +(total * 0.09).toFixed(2);
  } else {
    igst = +(total * 0.18).toFixed(2);
  }
  const now = new Date();
  const date = now.toString().split(" GMT")[0];

  const totalamount = (total + sgst + cgst + igst).toFixed(2);
  const amount_in_word = convert.toWords(Math.floor(totalamount));

  let monthamount = 0;
  let month = 0;
  if (plan === "Yearly") {
    monthamount = (amount / 12).toFixed(2);
    month = 12;
  } else if (plan === "Half-Yearly") {
    monthamount = (amount / 6).toFixed(2);
    month = 6;
  } else {
    monthamount = amount;
    month = 1;
  }

  const context = {
    customerName: name || "user",
    email: email || "-",
    phone: phone || "-",
    state: state || "Tamil Nadu",
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
    date: date,
    country: country || "India",
    currencyCode,
    countryFlag:
      countryFlag ||
      "https://cdn.ipinfo.io/static/images/countries-flags/IN.svg",
    monthamount,
    month,
  };

  const content = template(context);
  return {
    content,
    context,
  };
};

module.exports = {
  generateEmailTemplate,
};
