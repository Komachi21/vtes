const db = require("../database/db");
const axios = require("axios");
const access_token = require("../configs/config").facebookAuth.access_token;
const url = require("../configs/config").facebookAuth.url;
const Conversation = function (conversation) {
  // this.id = conversation.id,
  //   this.facebook_id = conversation.facebook_id,
  //   this.name = conversation.name,
  //   this.access_token = conversation.access_token
};

/* Danh sách các cuộc hội thoại */
Conversation.listItem =  function (id, result) {
   db.query("SELECT * FROM pages WHERE page_id = ?",id, async function (err, response) {
      var listConversation = [];
      const accessToken = response[0].access_token;
      const listConversationId = await axios.get(
        `${url}/me/conversations?access_token=${accessToken}`
      );
      let itemData = {};
      for (const item of listConversationId.data.data){
        itemData = await axios.get(
          `${url}/${item.id}?fields=senders,snippet&access_token=${accessToken}`
        );
        listConversation.push(itemData.data);
      }
      result(listConversation);
    }
  );
};

/* Chi tiết cuộc hội thoại */
Conversation.getItem = async function (data, result) {
  await db.query(
    "SELECT * FROM pages WHERE page_id = ?",
    data.page_id,
    async function (err, response) {
      const accessToken = response[0].access_token;
      const detailConversation = await axios(
        `${url}/${data.conversation_id}?fields=messages{message},senders&access_token=${accessToken}`
      );
      result(detailConversation.data);
    }
  );
};

/* Chat */
Conversation.chat=  function(data,result){
  db.query("SELECT access_token FROM pages WHERE page_id = ?",data.page_id, async function(err,response){
    const accessToken= response[0].access_token
    await axios.post(`${url}/me/messages?access_token=${accessToken}`,data)
    result("Gửi tin nhắn dc r")
  })
  
  
}
module.exports = Conversation;
