const DbPersons = require("./DbUsers");
const { NotFoundRecordError, CreateUserError } = require("./error/errors");

async function get(url, response) {
  try {
    let responseValue = "";
    const id = _parseURL(url);
    if (!id && id !== "") {
      responseValue = await DbPersons.findAll();
    } else {
      responseValue = await DbPersons.findById(id);
    }
    response.statusCode = 200;
    response.end(JSON.stringify(responseValue));
  } catch (error) {
    _catch(error, response);
  }
}

async function post(request, response) {
  try {
    if (_parseURL(request.url)) {
      throw new NotFoundRecordError(
        `Ресурс POST: ${request.url} не существует`
      );
    }

    let user = {};
    const chunks = [];
    await request.on("data", (chunk) => chunks.push(chunk));

    if (chunks.length == 0) {
      throw new CreateUserError("Объект JSON отсутствует в теле запроса");
    }
    try {
      reqBody = JSON.parse(chunks);
    } catch (error) {
      throw new CreateUserError("Передан невалидный объект JSON");
    }

    user = DbPersons.createUser(reqBody);

    response.statusCode = 201;
    response.end(JSON.stringify(user));
  } catch (error) {
    _catch(error, response);
  }
}

async function put(request, response) {
  try {
    const id = _parseURL(request.url);

    if (!id) {
      throw new NotFoundRecordError(`Ресурс PUT: ${request.url} не существует`);
    }

    let user = {};
    const chunks = [];
    await request.on("data", (chunk) => chunks.push(chunk));

    if (chunks.length == 0) {
      throw new CreateUserError("Объект JSON отсутствует в теле запроса");
    }
    try {
      reqBody = JSON.parse(chunks);
    } catch (error) {
      throw new CreateUserError("Передан невалидный объект JSON");
    }

    user = DbPersons.editUser(id, JSON.parse(chunks));

    response.statusCode = 200;
    response.end(JSON.stringify(user));
  } catch (error) {
    _catch(error, response);
  }
}

async function remove(url, response) {
  try {
    const id = _parseURL(url);
    if (id) {
      await DbPersons.deleteUser(id);

      response.statusCode = 204;
      response.end();
    } else {
      throw new NotFoundRecordError("Нет ID для удаления");
    }
  } catch (error) {
    _catch(error, response);
  }
}

function _parseURL(url) {
  if (url === "/api/user") {
    return false;
  } else if (url.indexOf("/api/user/") === 0) {
    const id = url.replace("/api/user/", "");

    return id;
  } else {
    throw new NotFoundRecordError(`Ресурс ${url} не существует`);
  }
}

function _catch(error, response) {
  switch (error.name) {
    case "BadRequestError":
      response.statusCode = 400;
      break;

    case "CreatePersonError":
      response.statusCode = 400;
      break;

    case "NotFoundRecordError":
      response.statusCode = 404;
      break;

    default:
      response.statusCode = 500;
      break;
  }

  response.end(error.message);
}

module.exports = {
  get,
  post,
  put,
  remove,
};
