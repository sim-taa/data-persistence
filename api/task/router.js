// build your `/api/tasks` router here
const router = require("express").Router();
const res = require("express/lib/response");
const Task = require("./model.js");
const { newTaskPayloadValidation } = require("./middleware");
const { checkProjectIdExists } = require("./middleware");

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

router.post(
  "/",
  newTaskPayloadValidation,
  checkProjectIdExists,
  async (req, res, next) => {
    //eslint-disable-line
    try {
      const newTask = req.body;
      const task = await Task.insert(newTask);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: "failed to create a task" });
    }
  }
);

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
