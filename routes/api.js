"use strict";
module.exports = (mongoose, utils, constants) => {
  const express = require("express");
  const router = express.Router();
  const questionanswer = mongoose.model("qa");
  const db = mongoose.connection.db;
  const collection = db.collection("qa");

  router.post("/addsegment", async (req, res) => {
    try {
      console.log(req.body);
      const { segmentid, title, nofexercise, video } = req.body;
      console.log(segmentid);
      // Insert the new segment directly into the database
      const newSegment = {
        segmentid,
        title,
        video,
        nofexercise,
        questions: {},
        exercise: [],
      };
      console.log(newSegment);
  
      const result = await collection.insertOne(newSegment);
  
      return res.status(201).json({
        message: "New segment created successfully!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Failed to create segment", error });
    }


    
  });
  
  router.post("/addqa", async (req, res) => {
    try {
      let { segmentid, title, video, exercise, question, answers, nofexercise,timeline,rawquestion } = req.body;

      answers.forEach(answer => {
        question = question.replace(answer, `{{}}`);
      });
  
      const questionId = Date.now().toString();
      const questionData = {
        exercise,
        question: question,
        rawquestion,
        answers,
        timeline,
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
          data: result.ops[0],
        });
      }
    } catch (error) {
      return res.status(500).json({ message: "Failed to add question", error });
    }
  });
  
  
  router.get("/getqa", async (req, res) => {
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
  
  router.get("/segments", async (req, res) => {
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
  
  
  router.get("/getqa/:id", async (req, res) => {
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
        answers: Array(q.answers.length).fill(""),
        result: Array(q.answers.length).fill(false),
      }));
  
      return res.status(200).json({
        message: "Segment retrieved successfully!",
        data: { video, title, segmentid, questions: transformedQuestions },
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch segment", error });
    }
  });
  
  
  router.put("/editqa", async (req, res) => {
    try {

      let { segmentid, qid, answers,timeline,question,exercise,rawquestion,title,video } = req.body;

      answers.forEach(answer => {
        question = question.replace(answer, `{{}}`);
      });
  
      const updatedQuestionData = {
        exercise,
        question: question,
        rawquestion,
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
  
  
  
  router.post("/segment/delete", async (req, res) => {
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
  

  router.put("/check-answer/:id", async (req, res) => {
    try {
      
      const { qid, blanks } = req.body;
      
      const exercise = await collection.findOne({ _id: new  mongoose.Types.ObjectId(req.params.id)});
  
      const dbAnswers = exercise.questions[qid].answers;

      const result = blanks.map((answer, i) => answer.trim().toLowerCase() === dbAnswers[i].trim().toLowerCase());
      const video = exercise.questions[qid].timeline;
      // Return the result in the response
      return res.status(200).json({
        message: "Answer comparison completed.",
        result: result, // true or false
        video : video,
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  });

  return router;
};
