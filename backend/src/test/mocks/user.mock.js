

const validUser = {
  id: 1,
  name: "Jane",
  surname: "Doe",
  email: "jane.doe@email.com",
  password: "P@ssword123",
  role: 1,
  picture: "",
  createdAt: new Date("2024-11-12"),
};

const validList = [
  {
    id: 1,
    name: "Jane",
    surname: "Doe",
    email: "jane.doe0@email.com",
    password: "P@ssword123",
    role: 1,
    picture: "",
    createdAt: new Date("2024-11-12"),
  },
  {
    id: 2,
    name: "Jane",
    surname: "Valentine",
    email: "jane.valentine@email.com",
    password: "P@ssword123",
    role: 1,
    picture: "",
    createdAt: new Date("2024-11-12"),
  },
  {
    id: 3,
    name: "Aria",
    surname: "Stark",
    email: "Aria.Stark@email.com",
    password: "P@ssword123",
    role: 1,
    picture: "",
    createdAt: new Date("2024-11-12"),
  },
  {
    id: 4,
    name: "John",
    surname: "Snow",
    email: "John.Snow@email.com",
    password: "P@ssword123",
    role: 1,
    picture: "",
    createdAt: new Date("2024-11-12"),
  },
  {
    id: 5,
    name: "John",
    surname: "Doe",
    email: "John.doe4@email.com",
    password: "P@ssword123",
    role: 1,
    picture: "",
    createdAt: new Date("2024-11-12"),
  },
];

class UserBuilder {
  constructor() {
    this.user = {
      id: 1,
      name: "Jane",
      surname: "Doe",
      email: "jane.doe@email.com",
      password: "P@ssword123",
      role: "admin",
      picture: "",
      createdAt: new Date("2024-11-12"),
    };
  }

  static user() {
    return new UserBuilder();
  }

  invalidName() {
    this.user.name = "Jane*";
    return this;
  }
  invalidSurname() {
    this.user.surname = "*Doe";
    return this;
  }
  invalidEmail() {
    this.user.email = "email";
    return this;
  }
  invalidPasswordChar() {
    this.user.password = "password";
    return this;
  }
  invalidPasswordLength() {
    this.user.password = "p@sswo";
    return this;
  }
  missingName() {
    this.user.name = "";
    return this;
  }
  missingSurname() {
    this.user.surname = "";
    return this;
  }
  missingEmail() {
    this.user.email = "";
    return this;
  }
  missingPassword() {
    this.user.password = "";
    return this;
  }

  build() {
    return this.user;
  }
}

module.exports = {
  validUser,
  validList,
  UserBuilder
};
