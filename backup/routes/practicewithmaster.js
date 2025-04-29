"use strict";
module.exports = (mongoose, utils, constants) => {
  const express = require("express");
  const multer = require("multer");
  const path = require("path");
  const fs = require("fs/promises"); // Use fs/promises for async operations

  const router = express.Router();
  const db = mongoose.connection.db;
  const collection = db.collection("practicewithmaster");

  // Multer configuration
  const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      try {
        const userIdAsString = 'practicewithmaster';
        const dir = path.join(__dirname, "../public/audios", userIdAsString);
        await fs.mkdir(dir, { recursive: true });
        cb(null, dir);
      } catch (err) {
        cb(err);
      }
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = "practice_edu_" + Date.now();
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

  const upload = multer({ storage });
  
  router.post("/addsegment", async (req, res) => {
    try {
      const { segmentid, title, nofexercise, video } = req.body;
      console.log(req.body);
      // Insert the new segment directly into the database
      const newSegment = {
        segmentid,
        title,
        video,
        nofexercise,
        questions: {},
        exercise: [],
      };
  
      const result = await collection.insertOne(newSegment);
  
      return res.status(201).json({
        message: "New segment created successfully!",
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed to create segment", error });
    }
  });

  router.post("/addpractice",upload.single("audio"), async (req, res) => {
    try {
      const { segmentid, title, video, exercise, question, answer, nofexercise, timeline, rawquestion } = req.body;

      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }

      const audiopath = req.file ? req.file.path : null;
      const questionId = Date.now().toString();
      const questionData = {
        exercise,
        question,
        audiopath,
        answer,
      };
  
      const segment = await collection.findOne({ segmentid });

      if (segment) {
        // Update the existing segment
        const updatedQuestions = { ...segment.questions, [questionId]: questionData };
        const updatedExercise = [...segment.exercise, questionId];
  
        await collection.updateOne(
          { segmentid },
          {
            $set: {
              title,
              video,
              nofexercise: Number(nofexercise),
              questions: updatedQuestions,
              exercise: updatedExercise,
            },
          }
        );
  
        return res.status(200).json({ message: "Segment updated successfully!" });
      } else {
        // Create a new segment if it doesn't exist
        const newSegment = {
          segmentid,
          title,
          video,
          nofexercise: Number(nofexercise),
          questions: { [questionId]: questionData },
          exercise: [questionId],
        };
  
        const result = await collection.insertOne(newSegment);
  
        return res.status(201).json({
          message: "New segment created successfully!",
        });
      }
    } catch (error) {
        console.log(error);
      return res.status(500).json({ message: "Failed to add question", error });
    }
  });

  router.get("/getpractice", async (req, res) => {
    try {
      const segments = await collection.find({}).toArray();

      return res.status(200).json({
        message: "Segments retrieved successfully!",
        data: segments,
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch segments", error });
    }
  });
  
  router.get("/practicesegments", async (req, res) => {
    try {
  
      // Query the database to retrieve specific fields
      const segments = await collection
        .find({}, { projection: { _id: 1, segmentid: 1, video: 1, title: 1, nofexercise: 1 } })
        .toArray();
  
      return res.status(200).json({
        message: "Segments retrieved successfully!",
        data: segments,
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch segments", error });
    }
  });
  
  
  router.get("/getpractice/:id", async (req, res) => {
    try {
  
      const segment = await collection.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
  
      if (!segment) {
        return res.status(404).json({ message: "Segment not found" });
      }
  
      // Destructure the segment properties
      const { video, title, segmentid, questions } = segment;
  
      // Transform the questions as needed
      const transformedQuestions = Object.entries(questions || {}).map(([qid, q]) => ({
        q_id: qid,
        question: q.question,
        rawquestion: q.rawquestion,
        exercise: q.exercise,
        timeline: q.timeline,
        answers: q.answers,
      }));
  
      return res.status(200).json({
        message: "Segment retrieved successfully!",
        data: { video, title, segmentid, questions: transformedQuestions },
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch segment", error });
    }
  });

  router.put("/editpractice", async (req, res) => {
    try {

      let { segmentid, qid, answers,timeline,question,exercise,rawquestion,title,video } = req.body;

  
      const updatedQuestionData = {
        exercise,
        question: question,
        answers,
        timeline,
      };
  
      const updateResult = await collection.updateOne(
        { segmentid },
        {
          $set: {
            [`questions.${qid}`]: updatedQuestionData,
            title,
            video,
          },
        }
      );
  
      if (updateResult.matchedCount === 0) {
        return res.status(404).json({ message: "Segment not found" });
      }
  
      return res.status(200).json({ message: "Question updated successfully!" });
    } catch (error) {
      return res.status(500).json({ message: "Failed to edit question", error });
    }
  });
  
  router.post("/deletepractice", async (req, res) => {
    try {
      const { id } = req.body;
  
      const deleteResult = await collection.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
  
      if (deleteResult.deletedCount === 0) {
        return res.status(404).json({ message: "Segment not found" });
      }
  
      return res.status(200).json({ message: "Segment deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete segment", error });
    }
  });
  
  return router;
};
