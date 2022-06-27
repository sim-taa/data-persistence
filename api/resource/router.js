const router = require("express").Router();
const res = require("express/lib/response");
const Resource = require("./model.js");
const {
  newResourcePayloadValidation,
  rejectDuplicateName,
} = require("./middleware");

router.get("/", async (req, res, next) => {
  const resources = await Resource.get()
    .then((found) => {
      res.json(found);
    })
    .catch((err) => {
      res.status(500).json({
        message: "the resources information could not be retrieved",
        err: err.message,
        stack: err.stack,
      });
    });
});

router.post(
  "/",
  newResourcePayloadValidation,
  rejectDuplicateName,
  async (req, res, next) => {
    //eslint-disable-line
    const newResource = req.body;
    const resource = await Resource.insert(newResource).catch((err) => {
      res.status(400).json({
        message: "already exists",
      });
    });
    res.status(201).json(resource);
  }
);

router.use("*", (req, res) => {
  res.json({ api: "up" });
});

router.use((err, req, res, next) => {
  res.status(500).json({
    customMessage: "something went wrong inside the resource router",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
