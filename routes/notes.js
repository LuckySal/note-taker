const notes = require("express").Router();
const { readAndAppend, readFromFile } = require("../util/fsUtils");

const db = "./db/db.json";

notes.get("/", (req, res) =>
  readFromFile(db).then((data) => res.json(JSON.parse(data)))
);

notes.post("/", (req, res) => {
  const { title, text } = req.body;
  if (title && text) readAndAppend(req.body, db);
});

notes.delete("/:id", (req, res) => {});

module.exports = notes;
