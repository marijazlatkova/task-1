const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/config.env` });

require("./pkg/db");

const u = require("./handlers/universities");
const f = require("./handlers/faculties");
const v = require("./handlers/views");

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/universities", u.create);
app.get("/universities", u.getAll);
app.get("/universities/:id", u.getOne);
app.patch("/universities/:id", u.update);
app.delete("/universities/:id", u.remove);

app.post("/faculties", f.create);
app.get("/faculties", f.getAll);
app.get("/faculties/:id", f.getOne);
app.patch("/faculties/:id", f.update);
app.delete("/faculties/:id", f.remove);

app.get("/viewUniversities", v.view);
app.get("/viewDetails/:id", v.viewDetails);
app.post("/create", v.create);
app.post("/modify/:id", v.modify);
app.get("/remove/:id", v.remove);

app.listen(process.env.PORT, (err) => {
  err 
  ? console.log(err) 
  : console.log(`Server started successfully at port ${process.env.PORT}`);
});