const Conversation = require("../models/Conversation");

const index = function (req, res) {
  var id = req.params.id;
  Conversation.listItem(id, function (response) {
    res.send(response);
  });
};

const get = function (req, res) {
  var data = req.body;
  Conversation.getItem(data, function (response) {
    res.send(response);
  });
};

const chat = function(req,res){
  var data = req.body;
  Conversation.chat(data, function (response) {
    res.send(response);
  });
}

module.exports = {
  index,
  get,
  chat
};
