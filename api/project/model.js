// build your `Project` model here
const db = require("../../data/dbConfig.js");
const mappers = require("../../data/helpers/mappers.js");

module.exports = {
  get,
  insert,
};

function get() {
  return db("projects").then((projects) =>
    projects.map(function (project) {
      return {
        ...project,
        project_completed: project.project_completed ? true : false,
      };
    })
  );
}
function insert(project) {
  return db("projects")
    .insert(project)
    .then(([project_id]) => db("projects").where({ project_id }))
    .then(([project]) => ({
      ...project,
      project_completed: project.project_completed ? true : false,
    }));
}
