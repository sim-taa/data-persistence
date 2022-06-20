// build your `Project` model here
const db = require("../../data/dbConfig.js");
const mappers = require("../../data/helpers/mappers.js");

module.exports = {
  get,
  insert,
};

function get(project_id) {}

function insert(project) {
  return db("projects")
    .insert(project)
    .then(([project_id]) => get(id));
}
