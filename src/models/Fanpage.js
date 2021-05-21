const db = require("../database/db");
const axios = require("axios");
const access_token = require("../configs/config").facebookAuth.access_token;
const url = require("../configs/config").facebookAuth.url;
const Fanpage = function (fanpage) {
  this.id = fanpage.id;
  this.name = fanpage.name;
  this.access_token = fanpage.access_token;
  this.page_id = fanpage.page_id;
};

/* Danh sách trang */
Fanpage.listItem = async function (result) {
  const listPageOfUser = await axios.get(
    `${url}/me/accounts?access_token=${access_token}`
  );
  db.query("SELECT * FROM pages", function (err, response) {
    if (err) result(null);
    const listActive = response.map((item) => item.page_id);
    const listPagesActive = listPageOfUser.data.data.filter((item) => {
      return listActive.includes(item.id);
    });
    result({
      listPagesActive: listPagesActive,
      listPageOfUser: listPageOfUser.data.data,
    });
  });
};

/* Login page và update access_token vào database */
Fanpage.loginPage = async function (id, result) {
  var pageId = id;
  const accessPageToken = await axios.get(
    `${url}/${pageId}?fields=access_token&access_token=${access_token}`
  );
  db.query(
    "UPDATE pages SET access_token = ? WHERE page_id = ? ",
    [accessPageToken.data.access_token, pageId],
    function (err, response) {}
  );
  result({ message: "Đăng nhập page thành công" });
};

/* Tìm kiếm trang  */
Fanpage.listItemBySearch = function (data, result) {
  db.query(
    "SELECT * FROM pages WHERE name LIKE  ? ",
    data.keyword,
    function (err, response) {
      if (err) result(null);
      result( response );
    }
  );
};

/* Kích hoạt trang, thêm mới vào DB  */
Fanpage.saveItem = async function (data, result) {
  db.query("INSERT INTO pages SET ?", data, function (err, response) {
    if (err) result(null);
    result({message:"Thêm thành công"});
  });
};

/* Xóa  */
Fanpage.deleteItem = function (id, result) {
  db.query("DELETE FROM pages WHERE page_id = ?", id, function (err, response) {
    if (err) result(null);
    result({ message: "Xóa Fanpage thành công" });
  });
};

module.exports = Fanpage;
