const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const generatePDF = async (htmlContent, filename = "invoice") => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  await page.setContent(htmlContent, {
    waitUntil: "domcontentloaded",
  });

  const outputDir = path.join(__dirname, "../public/invoices");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const filePath = path.join(outputDir, `${filename}.pdf`);
  console.log(`PDF file path: ${filePath}`);

  await page.pdf({
    path: filePath,
    format: "A4",
    printBackground: true,
    margin: {
      top: "20px",
      bottom: "20px",
      left: "10px",
      right: "10px",
    },
  });

  await browser.close();

  return filePath;
};

module.exports = {
  generatePDF,
};
