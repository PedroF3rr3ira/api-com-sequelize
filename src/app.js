import "dotenv/config";
import express from "express";
import Youch from "youch";
import routes from "./routes";

import "./database";
import "express-async-errors";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      const errors = await new Youch(err, req).toJSON();

      res.status(500).json(errors);
    });
  }
}

export default new App().server;
