// build your `/api/tasks` router here
const router = require("express").Router();
const res = require("express/lib/response");
const Task = require("./model.js");
const { newTaskPayloadValidation } = require("./middleware");

router.get("/", async (req, res, next) => {
  const tasks = await Task.get()
    .then((found) => {
      res.json(found);
    })
    .catch((err) => {
      res.status(500).json({
        message: "the tasks information could not be retrived",
        err: err.message,
        stack: err.stack,
      });
    });
});

router.post("/", newTaskPayloadValidation, async (req, res, next) => {
  //eslint-disable-line
  const newTask = req.body;
  const task = await Task.insert(newTask).catch((err) => {
    res.status(400).json({
      message: "already exists",
    });
  });
  res.status(201).json(task);
});

router.use("*", (req, res) => {
  res.json({ api: "up" });
});

router.use((err, req, res, next) => {
  res.status(500).json({
    customMessage: "something went wrong inside the task router",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
