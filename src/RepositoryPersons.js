const uuid = require("uuid");
const Person = require("./Person");
const { NotFoundRecordError, BadRequestError } = require("./error/errors");
const { CreatePersonError } = require("./error/errors");

const ITEM_NOT_FOUND = -1;

class RepositoryPersons {
  constructor() {
    this.arrayPerson = [];
  }

  //get
  findById(id) {
    const index = this.checkId(id);

    return this.arrayPerson[index];
  }

  findAll() {
    return this.arrayPerson;
  }

  //post
  createPerson(pers) {
    const person = new Person(pers);
    this.arrayPerson.push(person);

    return person;
  }

  //put
  editPerson(id, pers) {
    const index = this.checkId(id);
    const person = new Person(pers);
    person.id = id;
    this.arrayPerson[index] = person;
    return person;
  }

  //delete
  deletePerson(id) {
    const index = this.checkId(id);
    this.arrayPerson.splice(index, 1);
    return true;
  }

  checkId(id) {
    if (!uuid.validate(id)) {
      throw new BadRequestError("ID is not UUID");
    }
    const index = this.arrayPerson.findIndex((person) => person.id === id);
    if (index === ITEM_NOT_FOUND)
      throw new NotFoundRecordError("ID does not exist, record not found");

    return index;
  }
}

module.exports = new RepositoryPersons();
