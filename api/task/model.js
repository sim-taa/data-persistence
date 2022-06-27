// build your `Task` model here
const db = require("../../data/dbConfig.js");
const mappers = require("../../data/helpers/mappers.js");

module.exports = {
  get,
  insert,
};

function get() {
  return db("tasks")
    .join("projects", "projects.project_id", "tasks.project_id")
    .then((tasks) =>
      tasks.map(function (task) {
        //   project_id = task.project_id;
        //   db("projects")
        //     .where({ project_id: project_id })
        //     .then((projects) =>
        //     console.log(projects, "foobar2")

        //     );
        return {
          ...task,
          task_completed: task.task_completed ? true : false,
          //project_name: "fake",
          // project_name: project.project_name,
          //project_description: project.project_description,
        };
      })
    );
}

// async function get() {
//     const tasks = await db("tasks")
//     .join("projects", "projects.project_id", "tasks.project_id")
//     .select( "project.project_name", "project.project_description")
//     .where({project_id: project_id})
// }

function insert(task) {
  return db("tasks")
    .insert(task)
    .then(([project_id]) => db("tasks").where({ project_id }))
    .then(([task]) => ({
      ...task,
      task_completed: task.task_completed ? true : false,
    }));
}
