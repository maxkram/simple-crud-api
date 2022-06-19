const server = require("./app");
require("dotenv").config();

const port = process.env.PORT || 9999;
server.listen(port, (error) => {
  if (error) {
    console.log("Серверная ошибка: " + error);
  } else {
    console.log("Сервак работает на порту: " + port);
  }
});
module.exports = server;
