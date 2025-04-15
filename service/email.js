const sgMail = require("@sendgrid/mail");
const fs = require("fs");
require("dotenv").config();

const email = async (req, res) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const pathToAttachment = `${__dirname}/../public/files/demo.pdf`;
    const attachment = fs.readFileSync(pathToAttachment).toString("base64");

    const msg = {
      to: "santhoshkumar27697@gmail.com",
      from: "prasanna.flipflop@gmail.com",
      subject: "Sending with SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>This is a test email with PDF attachment.</strong>",
      attachments: [
        {
          content: attachment,
          filename: "attachment.pdf",
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
    };

    const response = await sgMail.send(msg);

    console.log("Email sent. Status:", response[0].statusCode);
    console.log("Email Header", response[0].headers)
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("SendGrid Error:", error.response?.body || error.message);
    return res.status(500).json({ message: "Failed to send email" });
  }
};
module.exports = { email };
