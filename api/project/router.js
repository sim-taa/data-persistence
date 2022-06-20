const router = require("express").Router();
const res = require("express/lib/response");
const Project = require("./model.js");
// build your `/api/projects` router here

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
router.post("/", async (req, res, next) => {
  //eslint-disable-line
  const newProject = req.body;
  const project = await Project.insert(newProject);
  res.status(201).json(project);
});

module.exports = router;
