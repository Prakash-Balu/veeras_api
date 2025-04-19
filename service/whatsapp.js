const client = require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );


const whatsapp = async () => {
   try{
    client.messages
      .create({
        from: "whatsapp:+14155238886",
        to: "whatsapp:+919750989497",
        body: msg,
        mediaUrl: [
          "https://thumbs.dreamstime.com/b/welcome-word-blue-circles-white-93627727.jpg",
        ],
      })
    }
    catch (error) {
      
  }
}

module.exports = { whatsapp };