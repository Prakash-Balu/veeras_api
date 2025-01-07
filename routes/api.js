"use strict";
module.exports = (mongoose, utils, constants) => {
  const express = require("express");
  const router = express.Router();
  const SelfPracticeSegment = mongoose.model("SelfpracticeSegment");

  router.post("/addsegment", async (req, res) => {
    try {
        console.log(req.body);
        const { segmentid, title, nofexercise, video } = req.body;
        const newSegment = new SelfPracticeSegment({
          segmentid,
          title,
          video,
          nofexercise,
          questions: {},
          exercise: [],
        });
        await newSegment.save();

        return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', newSegment);
      } catch (err) {
        console.log(err);
        return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
      }
  });

  router.post("/addqa", async (req, res) => {
    try {
      const { segmentid, title, video, exercise, question, answers, nofexercise, timeline, rawquestion } = req.body;
  
      const questionId = Date.now().toString();
      const questionData = {
        exercise,
        question: question.replace(/\b(?:" + answers.join('|') + ")\b/g, "{{}}"),
        rawquestion,
        answers,
        timeline,
      };
  
      const segment = await SelfPracticeSegment.findOne({ segmentid });
  
      if (segment) {
        segment.title = title;
        segment.video = video;
        segment.nofexercise = Number(nofexercise);
        segment.questions.set(questionId, questionData);
        segment.exercise.push(questionId);
        await segment.save();
  
        return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', segment);
      } else {
        const newSegment = new SelfPracticeSegment({
          segmentid,
          title,
          video,
          nofexercise: Number(nofexercise),
          questions: { [questionId]: questionData },
          exercise: [questionId],
        });
        await newSegment.save();

        return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', newSegment);
      }
    } catch (err) {
        console.log(err);
        return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
    }
  });

  router.get("/getqa", async (req, res) => {
    try {
      const segments = await SelfPracticeSegment.find();
      
      return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', segments);
    } catch (err) {
        console.log(err);
        return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
    }
  });
  
  router.get("/segments", async (req, res) => {
    try {
      const segments = await SelfPracticeSegment.find({}, "_id segmentid video title nofexercise");
    
      return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', segments);
    } catch (err) {
        console.log(err);
        return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
    }
  });

  return router;
};
