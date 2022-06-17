const router = require("express").Router();
const Project = require("./model.js");
// build your `/api/projects` router here
router.post("/", async (req, res, next) => {
  const newProject = req.body;
  const project = await Project.insert(newProject);
  res.status(201).json(project);
});

module.exports = router;
