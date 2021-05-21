// Goi model
const User = require("../models/User");
const index = function (req, res) {
  // Callback
  User.fetch(function (data) {
    res.send( data );
  });
};

const get = function (req, res) {
  User.getItem(req.params.id, function (response) {
    res.send(response);
  });
};

// body-parser de nhan data tu body request
const save = function (req, res) {
  var data = req.body;

  User.add(data, function (response) {
    res.send({ result: response });
  });
};

const del = function (req, res) {
  var id = req.params.id;

  User.remove(id, function (response) {
    res.send({ result: response });
  });
};

const update = function (req, res) {
  var data = {
    id: req.body.id,
    data: req.body,
  };

  User.update(data, function (response) {
    res.send({ result: response });
  });
};

module.exports = {
  index,
  get,
  save,
  del,
  update,
};
