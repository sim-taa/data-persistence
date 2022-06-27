const router = require("express").Router();
const res = require("express/lib/response");
const Project = require("./model.js");
const { newProjectPayloadValidation } = require("./middleware");

router.get("/", async (req, res, next) => {
  const projects = await Project.get()
    .then((found) => {
      res.json(found);
    })
    .catch((err) => {
      res.status(500).json({
        message: "the projects information could not be retrieved",
        err: err.message,
        stack: err.stack,
      });
    });
});

router.post("/", newProjectPayloadValidation, async (req, res, next) => {
  //eslint-disable-line
  const newProject = req.body;
  console.log(req.body);
  const project = await Project.insert(newProject);
  res.status(201).json(project);
});

router.use("*", (req, res) => {
  res.json({ api: "up" });
});

router.use((err, req, res, next) => {
  res.status(500).json({
    customMessage: "something went wrong inside the project router",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
