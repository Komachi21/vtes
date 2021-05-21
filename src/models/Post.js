const db = require("../database/db");
const axios = require("axios");
const access_token = require("../configs/config").facebookAuth.access_token;
const url = require("../configs/config").facebookAuth.url;
const Post = function (post) {
  // this.id = post.id;
  // this.name = post.name;
  // this.access_token = post.access_token;
  // this.page_id = post.page_id;
};

Post.listItem = function (id, result) {
  db.query("SELECT * FROM pages WHERE page_id = ?", id, async function (err, response) {
      const accessPageToken = response[0].access_token
      const listPosts=await axios.get(`${url}/me/feed?access_token=${accessPageToken}`)
      result(listPosts.data)
    }
  );
};

module.exports = Post;
