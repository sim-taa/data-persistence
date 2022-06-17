// build your `Project` model here
const db = require("../../data/dbConfig.js");
module.exports = {
  get,
  insert,
  // update,
  // remove,
  // getProjectActions,
  // intToBoolean,
  // booleanToint,
  // projectToBody,
  // actionToBody,
};

function get() {}

function insert(project) {
  return db("projects").insert(project);
}
//   function intToBoolean(int) {
//     return int === 1 ? true : false;
//   }

//   function booleanToint(bool) {
//     return bool === true ? 1 : 0;
//   }

//   function projectToBody(project) {
//     const result = {
//       ...project,
//       completed: intToBoolean(project.completed),
//     };

//     if (project.actions) {
//       result.actions = project.actions.map(action => ({
//         ...action,
//         completed: intToBoolean(action.completed),
//       }));
//     }

//     return result;
//   }

//   function actionToBody(action) {
//     return {
//       ...action,
//       completed: intToBoolean(action.completed),
//      };
//   }
