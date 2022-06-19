const { v4: uuidv4 } = require("uuid");
const { CreateUserError } = require("./error/errors");

module.exports = class Person {
  constructor(person) {
    this.#checkPerson(person);
    this.id = uuidv4();
    this.name = this.#checkName(person.name);
    this.age = this.#checkAge(person.age);
    this.hobbies = this.#checkHobbies(person.hobbies);
  }

  #checkPerson(person) {
    if (!person.name)
      throw new CreateUserError("'Person' не содержит поле 'name'");
    if (!person.age)
      throw new CreateUserError("'Person' не содержит поле 'age'");
    if (!person.hobbies)
      throw new CreateUserError("'Person' не содержит поле 'hobbies'");
  }

  #checkAge(age) {
    if (typeof age !== "number" || age < 0) {
      throw new CreateUserError("Возраст должно быть число и больше нуля");
    }

    return age;
  }

  #checkName(name) {
    if (typeof name !== "string" || name.trim().length === 0) {
      throw new CreateUserError("Имя должно быть непустой стрингой");
    }

    return name;
  }

  #checkHobbies(hobbies) {
    if (
      !Array.isArray(hobbies) ||
      hobbies.some((element) => typeof element !== "string")
    ) {
      throw new CreateUserError("Хобби должно быть массивом стрингов");
    }

    return hobbies;
  }
};
