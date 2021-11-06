// const accountSid = "ACbb5223e76909088545d87f37deee0df5";
// const authToken = "fd10f37d9d071a52976fbbb7e2e74b8c";

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER,
} = require("../config/globals");

const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

module.exports = (user, text) => {
  client.messages
    .create({
      body: `El usuario ${user} escribio administrador y el siguiente texto: ${text}`,
      from: TWILIO_NUMBER,
      to: "+542616171509",
    })
    .then((message) => console.log(message.sid))
    .catch(console.log);
};
