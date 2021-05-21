// Goi ket noi database
const db = require("../database/db");
const axios = require("axios");
const in_array = require("in_array");
const User = function (user) {
  // this.id = user.id,
  //   this.facebook_id = user.facebook_id,
  //   this.name = user.name,
  //   this.access_token = user.access_token
};
const access_token =
  "EAAChZAeynhlwBAO4fjZBZCyBFGaHomzWySGyF4vy4e6g6KJ2JddZBa3gKlu5XmwSiSUojKIpguZCUwpv689TSfz5HO2BMW5TJ4R0aNGlsqaCkIhoNHDG1okD4dYHZCC9ZCD7X7c5ZCa4aIrFf12G6tXNZBbI73xZBheJEDHxsf4UNCLZCPkiXuQbT8YMg5URfU2sfrr1MlrVRqhC2gVNZAWcZAYux";
User.fetch = function (result) {
  axios
    .get(`https://graph.facebook.com/me/accounts?access_token=${access_token}`)
    .then((response) => {
      var listPageIdUser = [];
      var listPageIdActive = [];
      response.data.data.forEach((key, index) => {
        listPageIdUser.push(key.id);
      });
      db.query("SELECT * FROM pages WHERE active = 1 ", function (err, pages) {
        pages.forEach((key, index) => {
          listPageIdActive.push(key.page_id);
        });
      });
      result(listPageIdActive);
    });
};

User.getItem = function (id, result) {
  db.query("SELECT * FROM user WHERE id = ?", id, function (err, user) {
    if (err) result(null);
    result(user);
  });
};

User.add = function (data, result) {
  db.query("INSERT INTO user SET ?", data, function (err, user) {
    if (err) result(null);
    result({ id: user.insertID, ...data });
  });
};

User.remove = function (id, result) {
  db.query("DELETE FROM user WHERE id = ?", id, function (err, user) {
    if (err) result(null);
    result("Xoa du lieu co id la " + id + " thanh cong");
  });
};

User.update = function (data, result) {
  db.query(
    "UPDATE user SET facebook_id = ?, name = ?, access_token = ? WHERE facebook_id = ?",
    [
      data.data.facebook_id,
      data.data.name,
      data.data.access_token,
      data.data.facebook_id,
    ],
    function (err, user) {
      if (err) result(null);
      result("Cap nhat thanh cong");
    }
  );
};

module.exports = User;
