const axios = require("axios");

var apikey = "4e173856-35fb-4844-8f48-3e1471c4dd25";
var objs = [];

const hPOST = (req, res, next) => {
  objs.push(req.body);
  if (req.body.id == "") {
    objs[objs.length - 1].id = "xxx";
  }
  if (req.body.url == "") {
    objs[objs.length - 1].url =
      "https://vetstreet.brightspotcdn.com/dims4/default/0f42b23/2147483647/crop/0x0%2B0%2B0/resize/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F05%2Fae6220a81c11e0a0d50050568d634f%2Ffile%2FShiba-Inu-5-645mk070111.jpg";
  }

  res.json(objs);
  //   res.status(200).json(objs);
};

const hGET = (req, res, next) => {
  axios
    .get(
      `https://api.thecatapi.com/v1/images/search?api-key=${apikey}&limit=${
        req.params.amount
      }`
    )
    .then(response => {
      if (req.params.amount > 1) {
        objs = response.data;
        objs.map(cat => {
          cat.atk = "C";
          cat.def = "T";
        });
        console.log("successful GET: " + objs);
      } else if (req.params.amount == 1) {
        objs.push(response.data[0]);
        objs[objs.length - 1].atk = "C";
        objs[objs.length - 1].def = "T";
        console.log("single GET: " + objs);
      }

      res.json(objs);
    })
    .catch(err => {
      console.log(err);
    });
};

const hPUT = (req, res, next) => {
  console.log("- " + req.params.id);
  const index = objs.findIndex(cat => {
    if (cat.id == req.params.id) {
      return cat;
    }
  });
  console.log("- " + index);
  objs[index].atk = objs[index].id.charCodeAt(0) % 8;
  console.log(objs[index].atk);
  objs[index].def = (objs[index].id.charCodeAt(1) % 10) + 1;

  res.json(objs);
  // objs.map(cat => {
  //   cat.atk = cat.id.charCodeAt(0) % 8;
  //   cat.def = (cat.id.charCodeAt(1) % 10) + 1;
  //   // if (catatk > 3) {
  //   //   catatk = 3;
  //   // }
  //   // cat.atk = catatk;
  // });

  // hGET(req, res, next);
};

const hDELETE = (req, res, next) => {
  console.log("- " + req.params.id);
  // console.log();
  const index = objs.findIndex(cat => {
    if (cat.id == req.params.id) {
      return cat;
    }
  });
  console.log("---- " + index);
  objs.splice(index, 1);
  res.json(objs);
  console.log(objs);
  //hGET(req, res, next);
};

module.exports = {
  hDELETE,
  hGET,
  hPOST,
  hPUT
};
