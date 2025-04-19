const sgMail = require("@sendgrid/mail");
const fs = require("fs");
require("dotenv").config();

const email = async (toEmail, customerName, pdfFilePath) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // const pathToAttachment = `${__dirname}/../public/files/demo.pdf`;
    const attachment = fs.readFileSync(pdfFilePath).toString("base64");

    const msg = {
      to: toEmail,
      from: "prasanna.flipflop@gmail.com",
      subject: "Sending with SendGrid is Fun",
      text: `Hello ${customerName}, this is a test email with PDF attachment.`,
      html: "<strong>find your attachement.</strong>",
      attachments: [
        {
          content: attachment,
          filename: "attachment.pdf",
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
    };
console.log("msg", msg);

    const response = await sgMail.send(msg);

    console.log("Email sent. Status:", response[0].statusCode);
    console.log("Email Header", response[0].headers)

  } catch (error) {
    console.error("SendGrid Error:", error.response?.body || error.message);

  }
};
module.exports = { email };
