// build your `Task` model here
const db = require("../../data/dbConfig.js");
const mappers = require("../../data/helpers/mappers.js");

module.exports = {
  get,
  insert,
};

function get() {
  return db("tasks").then((tasks) =>
    tasks.map(function (task) {
      return {
        ...task,
        task_completed: task.task_completed ? true : false,
      };
    })
  );
}

function insert(task) {
  return db("tasks")
    .insert(task)
    .then(([project_id]) => db("tasks").where({ project_id }))
    .then(([task]) => ({
      ...task,
      task_completed: task.task_completed ? true : false,
    }));
}
