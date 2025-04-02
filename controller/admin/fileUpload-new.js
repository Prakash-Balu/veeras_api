"use strict";

module.exports = function (mongoose, utils, constants) {
  const ctrl = {};

  ctrl.uploadVideo = async (req, res) => {
    try {
      const { filename } = req.file;
      const { section } = req.body;
      if (!req.file || !section) {
        return utils.sendErrorNew(req, res, "BAD_REQUEST", "No file Upload");
      }
      const audioPath = `${process.env.LOCAL_IP}/videos/${section}/${filename}`;
      return utils.sendResponseNew(req, res, "OK", "SUCCESS", audioPath);
    } catch (error) {
      return utils.sendErrorNew(req, res, "BAD_REQUEST", error.message);
    }
  };

  return ctrl;
};
