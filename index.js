const express = require("express");
const { json } = require("body-parser");
const controller = require("./controllers/basic_controller");
const dogtroller = require("./controllers/basic_dogtroller");
const app = express();

var catsTurnBool = false;

app.use(json());
// app.use(express.static(__dirname + "/../public/build"));
app.use((req, res, next) => {
  //console.log("got a request!");
  next();
});

app.get("/api/cats/attack/:id", controller.hATTACK);
app.get("/api/cats/defend/:id", controller.hDEFEND);
app.get("/api/cats/turn", controller.hTGET);
app.get("/api/cats/:amount", controller.hGET);
app.post("/api/cats", controller.hPOST);
app.delete("/api/cats/:id", controller.hDELETE);
app.put("/api/cats/:id", controller.hPUT);

app.get("/api/dogs/attack/:id", controller.hATTACKd);
app.get("/api/dogs/defend/:id", controller.hDEFENDd);
app.get("/api/dogs/turn", controller.hTGETd);
app.get("/api/dogs/:amount", controller.hGETd);
app.post("/api/dogs", controller.hPOSTd);
app.delete("/api/dogs/:id", controller.hDELETEd);
app.put("/api/dogs/:id", controller.hPUTd);

//--------------------------------------------
app.listen(3001, () => {
  console.log("Listening on port: " + 3001);
});
