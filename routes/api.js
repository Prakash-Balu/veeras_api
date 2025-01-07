"use strict";
module.exports = (mongoose, utils, constants) => {
  const express = require("express");
  const router = express.Router();
  const SelfPracticeSegment = mongoose.model("SelfpracticeSegment");

  router.post("/addsegment", async (req, res) => {
    try {
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
      res.status(201).json({ message: "New segment created successfully!", data: newSegment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create segment", error });
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
  
        res.status(200).json({ message: "Segment updated successfully!" });
      } else {
        const newSegment = new Segment({
          segmentid,
          title,
          video,
          nofexercise: Number(nofexercise),
          questions: { [questionId]: questionData },
          exercise: [questionId],
        });
        await newSegment.save();
  
        res.status(201).json({ message: "New segment created successfully!", data: newSegment });
      }
    } catch (error) {
      console.error("Error adding question:", error);
      res.status(500).json({ message: "Failed to add question", error });
    }
  });
  
  router.get("/getqa", async (req, res) => {
    try {
      const segments = await SelfPracticeSegment.find();
      res.status(200).json({
        message: "Segments retrieved successfully!",
        data: segments,
      });
    } catch (error) {
      console.error("Error fetching segments:", error);
      res.status(500).json({ message: "Failed to fetch segments", error });
    }
  });
  
  router.get("/segments", async (req, res) => {
    try {
      const segments = await SelfPracticeSegment.find({}, "_id segmentid video title nofexercise");
      res.status(200).json({
        message: "Segments retrieved successfully!",
        data: segments,
      });
    } catch (error) {
      console.error("Error fetching segments:", error);
      res.status(500).json({ message: "Failed to fetch segments", error });
    }
  });
  
  router.get("/getqa/:id", async (req, res) => {
    try {
      const segment = await SelfPracticeSegment.findById(req.params.id);
      if (!segment) {
        return res.status(404).json({ message: "Segment not found" });
      }
  
      const { video, title, segmentid, questions } = segment;
      const transformedQuestions = Array.from(questions.entries()).map(([qid, q]) => ({
        q_id: qid,
        question: q.question,
        rawquestion: q.rawquestion,
        exercise: q.exercise,
        timeline: q.timeline,
        answers: Array(q.answers.length).fill(""),
        result: Array(q.answers.length).fill(false),
      }));
  
      res.status(200).json({
        message: "Segment retrieved successfully!",
        data: { video, title, segmentid, questions: transformedQuestions },
      });
    } catch (error) {
      console.error("Error fetching segment:", error);
      res.status(500).json({ message: "Failed to fetch segment", error });
    }
  });
  
  router.put("/editqa", async (req, res) => {
    try {
      const { segmentid, qid, answers, timeline, question, exercise, rawquestion, title, video } = req.body;
  
      const segment = await SelfPracticeSegment.findOne({ segmentid });
      if (!segment) {
        return res.status(404).json({ message: "Segment not found" });
      }
  
      const updatedQuestionData = {
        exercise,
        question: question.replace(/\b(?:" + answers.join('|') + ")\b/g, "{{}}"),
        rawquestion,
        answers,
        timeline,
      };
  
      segment.questions.set(qid, updatedQuestionData);
      segment.title = title;
      segment.video = video;
      await segment.save();
  
      res.status(200).json({ message: "Question updated successfully!" });
    } catch (error) {
      console.error("Error editing question:", error);
      res.status(500).json({ message: "Failed to edit question", error });
    }
  });
  
  router.post("/segment/delete", async (req, res) => {
    try {
      const { id } = req.body;
  
      const result = await SelfPracticeSegment.findByIdAndDelete(id);
  
      if (result) {
        res.status(200).json({ message: "Segment deleted successfully" });
      } else {
        res.status(404).json({ message: "Segment not found" });
      }
    } catch (error) {
      console.error("Error deleting segment:", error);
      res.status(500).json({ message: "Failed to delete segment", error });
    }
  });

  return router;
};
