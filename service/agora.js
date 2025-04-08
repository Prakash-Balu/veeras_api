const { RtcTokenBuilder, RtcRole } = require("agora-token");
require("dotenv").config();
const createToken = async (req, res) => {
  console.log("Request received for token generation");

  let appID = process.env.AGORA_APP_ID;
  let appCertificate = process.env.AGORA_PRIMARY_KEY;
  let channelName = req.query.channelName || "sampleChannel";
  let timeStamp = Date.now()
  let existChannelName =  `${channelName}_${timeStamp}`
  console.log("channelName", channelName);

  const uid = 0;
  let role = RtcRole.PUBLISHER;
  if (req.query.role === "Subscriber") {
    role = RtcRole.SUBSCRIBER;
  }
  const expiryTime = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;

  const token = RtcTokenBuilder.buildTokenWithUid(
    appID,
    appCertificate,
    channelName ,
    uid,
    role,
    expiryTime
  );

  console.log(" Token:", token);
  res.json({ channelName: existChannelName, token: token });
};

module.exports = { createToken };
