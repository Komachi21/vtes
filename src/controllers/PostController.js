const Post = require("../models/Post");

const index = function (req, res) {
  var id = req.params.id;
  Post.listItem(id, function (response) {
    res.send(response);
  });
};

module.exports = {
  index,
};
