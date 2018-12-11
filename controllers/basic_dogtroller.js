const axios = require("axios");

var apikey = "4e173856-35fb-4844-8f48-3e1471c4dd25";
var dog_objs = [];

const hPOSTd = (req, res, next) => {
  dog_objs.push(req.body);
  if (req.body.id == "") {
    dog_objs[dog_objs.length - 1].id = "xxx";
  }
  if (req.body.url == "") {
    dog_objs[dog_objs.length - 1].url =
      "https://vetstreet.brightspotcdn.com/dims4/default/0f42b23/2147483647/crop/0x0%2B0%2B0/resize/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F05%2Fae6220a81c11e0a0d50050568d634f%2Ffile%2FShiba-Inu-5-645mk070111.jpg";
  }

  res.json(dog_objs);
  //   res.status(200).json(dog_objs);
};

const hGETd = (req, res, next) => {
  axios
    .get(
      `https://api.thedogapi.com/v1/images/search?api-key=${apikey}&limit=${
        req.params.amount
      }`
    )
    .then(response => {
      if (req.params.amount > 1) {
        dog_objs = response.data;
        dog_objs.map(cat => {
          cat.atk = "C";
          cat.def = "T";
        });
        console.log("successful GET: " + dog_objs);
      } else if (req.params.amount == 1) {
        dog_objs.push(response.data[0]);
        dog_objs[dog_objs.length - 1].atk = "C";
        dog_objs[dog_objs.length - 1].def = "T";
        console.log("single GET: " + dog_objs);
      }

      res.json(dog_objs);
    })
    .catch(err => {
      console.log(err);
    });
};

const hPUTd = (req, res, next) => {
  console.log("- " + req.params.id);
  const index = dog_objs.findIndex(cat => {
    if (cat.id == req.params.id) {
      return cat;
    }
  });
  console.log("- " + index);
  dog_objs[index].atk = dog_objs[index].id.charCodeAt(0) % 8;
  console.log(dog_objs[index].atk);
  dog_objs[index].def = (dog_objs[index].id.charCodeAt(1) % 10) + 1;

  res.json(dog_objs);
  // dog_objs.map(cat => {
  //   cat.atk = cat.id.charCodeAt(0) % 8;
  //   cat.def = (cat.id.charCodeAt(1) % 10) + 1;
  //   // if (catatk > 3) {
  //   //   catatk = 3;
  //   // }
  //   // cat.atk = catatk;
  // });

  // hGET(req, res, next);
};

const hDELETEd = (req, res, next) => {
  console.log("- " + req.params.id);
  // console.log();
  const index = dog_objs.findIndex(cat => {
    if (cat.id == req.params.id) {
      return cat;
    }
  });
  console.log("---- " + index);
  dog_objs.splice(index, 1);
  res.json(dog_objs);
  console.log(dog_objs);
  //hGET(req, res, next);
};

module.exports = {
  hDELETEd,
  hGETd,
  hPOSTd,
  hPUTd
};
