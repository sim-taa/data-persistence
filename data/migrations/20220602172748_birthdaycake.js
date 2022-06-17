const { resource } = require("../../api/server");

exports.up = async function (knex) {
  await knex.schema
    .createTable("projects", (projects) => {
      projects.increments("project_id");
      projects.string("project_name").notNullable();
      projects.string("project_description");
      projects.boolean("project_completed").notNullable().defaultTo(0);
    })
    .createTable("resources", (resources) => {
      resources.increments("resource_id");
      resources.string("resource_name").unique().notNullable();
      resources.string("resource_description");
    })
    .createTable("tasks", (tasks) => {
      tasks.increments("task_id");
      tasks.string("task_description").notNullable();
      tasks.string("task_notes");
      tasks.boolean("task_completed").notNullable().defaultTo(0);
      tasks
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("project_id")
        .inTable("projects")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
    })
    .createTable("project_resources", (project_resources) => {
      project_resources.increments("project_resources_id");
      project_resources
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("resource_id")
        .inTable("resources")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
      project_resources
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("project_id")
        .inTable("projects")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema
    .dropTableIfExists("projects")
    .dropTableIfExists("resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("project_resources");
};
