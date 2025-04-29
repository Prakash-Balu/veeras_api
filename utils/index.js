const constants = require("../configs/constants");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const CODE_NEW = constants.codeNew;
const MSG = constants.text;
const privateKey = process.env.JWT_PRIVATE_KEY;
const algorithm = 'aes-256-cbc';
const secretKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

module.exports = {
  codeGenerator: function () {
    let char = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz1234567890";
    let codeLength = 6;
    let randomCode = "";
    for (var i = 0; i < codeLength; i++) {
      var rnum = Math.floor(Math.random() * char.length);
      randomCode += char.substring(rnum, rnum + 1);
    }
    return randomCode;
  },

  sendPaginationResponseNew: function (req, res, code, message, data, count) {
    code = typeof code === "undefined" ? "OK" : code;

    let skip = req.query.skip ? req.query.skip : req.body.skip;
    let limit = req.query.limit ? req.query.limit : req.body.limit;

    let resp = {
      meta: {
        code: CODE_NEW[code],
        message: MSG.en[message] || message,
        timestamp: new Date().toISOString(),
      },
      pagination: {
        skip: skip,
        limit: limit,
        totalCount: count,
      },
      data,
    };

    res.status(CODE_NEW[code]).json(resp);
  },

  sendResponseNew: function (req, res, code, message, data) {
    code = typeof code === "undefined" ? "OK" : code;

    let resp = {
      meta: {
        code: CODE_NEW[code],
        message: MSG.en[message] || message,
        timestamp: new Date().toISOString(),
      },
      data,
    };

    res.status(CODE_NEW[code]).json(resp);
  },

  notifyErrorNew: function (req, res, code, message) {
    code = typeof code === "undefined" ? "OK" : code;

    console.log(message)

    res.status(CODE_NEW[code]).json({
      meta: {
        code: CODE_NEW[code],
        message: MSG.en[message] || message,
        timestamp: new Date().toISOString(),
      },
    });
  },

  sendErrorNew: function (req, res, code, msg) {
    return module.exports.notifyErrorNew(req, res, code, msg);
  },

  sendServerErrorNew: function (req, res) {
    return module.exports.notifyErrorNew(req, res, "INTERNAL_SERVER_ERROR", "ERR");
  },


  channelDataHash: function () {
    const token = crypto.randomBytes(64).toString('hex');
    let channel_data = new Date().getDate() + "-" + new Date().getMonth() + "-" + new Date().getMinutes()
    let channel_data_hash = crypto.createHash('md5').update(channel_data + "||" + token).digest("hex");
    return channel_data_hash;
  },

  generateToken: function (data, expire) {
    const token = jwt.sign(data, privateKey, { expiresIn: expire })
    return token;
  },


  slug: function (text) {
    console.log("text", text);

    let slug = text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_")
      .replace(/\./g, "_");

    return slug
  },

  encrypt: (text) => {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  },

  decrypt: (text) => {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  },



};