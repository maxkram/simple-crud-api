const fs = require("fs");
const RepositoryPersons = require("./RepositoryPersons");
const { NotFoundRecordError, CreatePersonError } = require("./error/errors");

async function get(url, response) {
  try {
    let responseValue = "";
    const id = _parseURL(url);
    if (!id && id !== "") {
      responseValue = await RepositoryPersons.findAll();
    } else {
      responseValue = await RepositoryPersons.findById(id);
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
        `Resource POST: ${request.url} does not exist`
      );
    }

    let person = {};
    const chunks = [];
    await request.on("data", (chunk) => chunks.push(chunk));

    if (chunks.length == 0) {
      throw new CreatePersonError("Object JSON is missing in the request body");
    }
    try {
      reqBody = JSON.parse(chunks);
    } catch (error) {
      throw new CreatePersonError("Invalid JSON object passed");
    }

    person = RepositoryPersons.createPerson(reqBody);

    response.statusCode = 201;
    response.end(JSON.stringify(person));
  } catch (error) {
    _catch(error, response);
  }
}

async function put(request, response) {
  try {
    const id = _parseURL(request.url);

    if (!id) {
      throw new NotFoundRecordError(
        `Resource PUT: ${request.url} does not exist`
      );
    }

    let person = {};
    const chunks = [];
    await request.on("data", (chunk) => chunks.push(chunk));

    if (chunks.length == 0) {
      throw new CreatePersonError("Object JSON is missing in the request body");
    }
    try {
      reqBody = JSON.parse(chunks);
    } catch (error) {
      throw new CreatePersonError("Invalid JSON object passed");
    }

    person = RepositoryPersons.editPerson(id, JSON.parse(chunks));

    response.statusCode = 200;
    response.end(JSON.stringify(person));
  } catch (error) {
    _catch(error, response);
  }
}

async function remove(url, response) {
  try {
    const id = _parseURL(url);
    if (id) {
      await RepositoryPersons.deletePerson(id);

      response.statusCode = 204;
      response.end();
    } else {
      throw new NotFoundRecordError("Missing ID to delete");
    }
  } catch (error) {
    _catch(error, response);
  }
}

function _parseURL(url) {
  if (url === "/person") {
    return false;
  } else if (url.indexOf("/person/") === 0) {
    const id = url.replace("/person/", "");

    return id;
  } else {
    throw new NotFoundRecordError(`Resource ${url} does not exist`);
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
