const { response } = require("express");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const Db = require("./dboperations"),
  Persons = require("./persons"),
  bodyParser = require("body-parser"),
  express = require("express"),
  app = express(),
  router = express.Router(),
  cors = require("cors");

const { urlencoded, json } = bodyParser;
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
app.use("/api", router);

router.use((request, response, next) => {
  console.log("middleware");
  next();
});

router.route("/persons").get((request, response) => {
  Db.getPersons().then((result) => {
    response.send(result);
  });
});

router.route("/persons/:id").get((request, response) => {
  Db.getPersonById(request.params.id).then((result) => {
    response.send(result);
  });
});

router.route("/persons").post((req, res) => {
  let person = { ...req.body };

  Db.addPersonStoreP(person).then((result) => {
    res.status(201).json(result);
  });
});

const port = process.env.PORT || 8888;
app.listen(port, () => {
  console.log("DB API is running at port: " + port);
});
