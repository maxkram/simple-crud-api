import * as http from "http";
import router from "./src/router";

const server = http.createServer(function (request, response) {
  try {
    const { method, url } = request;
    switch (method) {
      case "GET":
        router.get(url, response);
        break;
      case "POST":
        router.post(request, response);
        break;
      case "PUT":
        router.put(request, response);
        break;
      case "DELETE":
        router.remove(url, response);
        break;

      default:
        response.statusCode = 404;
        response.end("Not supported method");
        break;
    }
  } catch (error) {
    response.statusCode = 500;
    response.end("Что-то пошло не так: " + error.message);
  }
});

export default server;
