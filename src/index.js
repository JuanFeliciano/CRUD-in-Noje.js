const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Juan:juangamer@cluster0.8r0ivb0.mongodb.net/?retryWrites=true&w=majority"
);
app.use(express.json());

const Film = mongoose.model("Film", {
  name: String,
  description: String,
});

app.get("/", async (req, res) => {
  const allfilm = await Film.find();
  return res.send(allfilm);
});

app.post("/", async (req, res) => {
  const film = new Film({
    name: req.body.name,
    description: req.body.description,
  });
  await film.save();
  return res.send(film);
});

app.delete("/:id", async (req, res) => {
  const film = await Film.findByIdAndDelete(req.params.id);
  return res.send(film);
});

app.put("/:id", async (req, res) => {
  const film = await Film.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
  });
  return res.send(film);
});

app.listen(port, () => {
  console.log(`app acessado na port ${port}`);
});
