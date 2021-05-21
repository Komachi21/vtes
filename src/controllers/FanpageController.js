const Fanpage = require("../models/Fanpage");

const index = function (req, res) {
  Fanpage.listItem(function (response) {
    res.send(response);
  });
};

const loginPage = function (req, res) {
  var id = req.params.id;
  Fanpage.loginPage(id, function (response) {
    res.send(response);
  });
};

const search = function (req, res) {
  var data = req.body;
  Fanpage.listItemBySearch(data, function (response) {
    res.send(response);
  });
};

const save = function (req, res) {
  var data = req.body;
  Fanpage.saveItem(data, function (response) {
    res.send(response);
  });
};

const destroy = function (req, res) {
  var id = req.params.id;
  Fanpage.deleteItem(id, function (response) {
    res.send(response);
  });
};

module.exports = {
  index,
  loginPage,
  save,
  destroy,
  search,
};
