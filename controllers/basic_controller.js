const axios = require("axios");

var dogTurnBool = false;
var apikey = "4e173856-35fb-4844-8f48-3e1471c4dd25";
var objs = [];
var dog_objs = [];

var catAtkID = null;
var dogAtkID = null;

const hATTACK = (req, res, next) => {
  const index = objs.findIndex(cat => {
    if (cat.id == req.params.id) {
      return cat;
    }
  });
  console.log(index + ".................req.params.id: " + req.params.id);
  catAtkID = objs[index];
  dogTurnBool = true;
  //awaiting winner bool res
};

const hDEFEND = (req, res, next) => {
  //find cat defending
  const index = objs.findIndex(cat => {
    if (cat.id == req.params.id) {
      return cat;
    }
  });
  catAtkID = objs[index];

  if (catAtkID.def <= dogAtkID.atk) {
    res.json(false);
  } else {
    res.json(true);
  }
  dogAtkID = null;
  catAtkID = null;
  //awaiting winner bool res
};

const hATTACKd = (req, res, next) => {
  const index = dog_objs.findIndex(cat => {
    if (cat.id == req.params.id) {
      return cat;
    }
  });
  dogAtkID = dog_objs[index];
  dogTurnBool = false;
  //awaiting winner bool res
};

const hDEFENDd = (req, res, next) => {
  //find cat defending
  const index = dog_objs.findIndex(cat => {
    if (cat.id == req.params.id) {
      return cat;
    }
  });
  dogAtkID = dog_objs[index];

  if (catAtkID.atk >= dogAtkID.def) {
    res.json(false);
  } else {
    res.json(true);
  }
  dogAtkID = null;
  catAtkID = null;
  //awaiting winner bool res
};

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

const hTGET = (req, res, next) => {
  if (dogAtkID != null) {
    let attacker = {
      turn: !dogTurnBool,
      dog: dogAtkID
    };
    res.json(attacker);
  } else {
    let attacker = { turn: !dogTurnBool, dog: null };
    res.json(attacker);
  }
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

  dogTurnBool = true;

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

const hTGETd = (req, res, next) => {
  if (catAtkID != null) {
    let attacker = {
      turn: dogTurnBool,
      cat: catAtkID
    };
    res.json(attacker);
  } else {
    let attacker = { turn: dogTurnBool, cat: null };
    res.json(attacker);
  }
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

  dogTurnBool = false;

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
  hATTACK,
  hDEFEND,
  hATTACKd,
  hDEFENDd,
  hTGET,
  hTGETd,
  hDELETEd,
  hGETd,
  hPOSTd,
  hPUTd,
  hDELETE,
  hGET,
  hPOST,
  hPUT
};
