import server from "./app";

const port = process.env.PORT || 9999;
server.listen(port, function (error) {
  if (error) {
    console.log("Серверная ошибка: " + error);
  } else {
    console.log("Сервак работает на порту: " + port);
  }
});
