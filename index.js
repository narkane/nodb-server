const express = require("express");
const { json } = require("body-parser");
const controller = require("./controllers/ basic_controller");
const app = express();

app.use(json());
// app.use(express.static(__dirname + "/../public/build"));
app.use((req, res, next) => {
  console.log("got a request!");
  next();
});

app.get("/api/cats/:amount", controller.hGET);
app.post("/api/cats", controller.hPOST);
app.delete("/api/cats/:id", controller.hDELETE);
app.put("/api/cats/:id", controller.hPUT);

//--------------------------------------------
app.listen(3001, () => {
  console.log("Listening on port: " + 3001);
});
