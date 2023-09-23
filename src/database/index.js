import Sequelize from "sequelize";

import config from "../config/database";

import Customer from "../app/models/Customer";
import Contact from "../app/models/Contact";
// import User from "../app/models/User";

const models = [Customer, Contact];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(config);

    models.forEach((model) => model.init(this.connection));
  }
}

export default new Database().connection;
