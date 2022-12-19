const notes = require("express").Router();
const { readAndAppend, readFromFile, writeToFile } = require("../util/fsUtils");
const { v4: uuidv4 } = require("uuid");

const db = "./db/db.json";

notes.get("/", (req, res) =>
  readFromFile(db).then((data) => res.json(JSON.parse(data)))
);

notes.post("/", (req, res) => {
  const { title, text } = req.body;
  if (title && text)
    readAndAppend({ title: title, text: text, id: uuidv4() }, db);
  res.status(200).json({ message: "Success!" });
});

notes.delete("/:id", async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  readFromFile(db)
    .then((response) => JSON.parse(response))
    .then((data) => {
      console.log(data);
      let index = data.findIndex((element) => element.id == id);
      if (index > -1) {
        data.splice(index, 1);
        writeToFile(db, data);
        res.status(200).json({ message: "Success!" });
      } else {
        res.status(404).json({ message: "Note does not exist!" });
      }
    });
});

module.exports = notes;
