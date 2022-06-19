const uuid = require("uuid");
const User = require("./user");
const { NotFoundRecordError, BadRequestError } = require("./error/errors");

const ITEM_NOT_FOUND = -1;

class DbUsers {
  constructor() {
    this.arrayUser = [];
  }

  //get
  findById(id) {
    const index = this.checkId(id);

    return this.arrayUser[index];
  }

  findAll() {
    return this.arrayUser;
  }

  //post
  createUser(pers) {
    const person = new User(pers);
    this.arrayUser.push(person);

    return person;
  }

  //put
  editUser(id, pers) {
    const index = this.checkId(id);
    const person = new User(pers);
    person.id = id;
    this.arrayUser[index] = person;
    return person;
  }

  //delete
  deleteUser(id) {
    const index = this.checkId(id);
    this.arrayUser.splice(index, 1);
    return true;
  }

  checkId(id) {
    if (!uuid.validate(id)) {
      throw new BadRequestError("ID не в формате UUID");
    }
    const index = this.arrayUser.findIndex((user) => user.id === id);
    if (index === ITEM_NOT_FOUND)
      throw new NotFoundRecordError("Нет такого ID, запись не найдена");

    return index;
  }
}

module.exports = new DbUsers();
