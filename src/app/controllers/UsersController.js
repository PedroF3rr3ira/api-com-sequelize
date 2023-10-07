import { Op } from "sequelize";
import * as YUP from "yup";
import { parseISO } from "date-fns";
import User from "../models/User";

class UsersController {
  async index(req, res) {
    const {
      name,
      email,
      createdBefore,
      createdAfter,
      updatedBefore,
      updatedAfter,
      sort,
    } = req.query;

    const page = req.query.page || 1;
    const limit = req.query.limit || 25;

    let where = {};
    let order = [];

    if (name) {
      where = {
        ...where,
        name: {
          [Op.iLike]: name,
        },
      };
    }
    if (email) {
      where = {
        ...where,
        email: {
          [Op.iLike]: email,
        },
      };
    }
    if (createdBefore) {
      where = {
        ...where,
        createdAt: {
          [Op.gte]: parseISO(createdBefore),
        },
      };
    }
    if (createdAfter) {
      where = {
        ...where,
        createdAt: {
          [Op.lte]: parseISO(createdAfter),
        },
      };
    }
    if (updatedBefore) {
      where = {
        ...where,
        updatedAt: {
          [Op.gte]: parseISO(updatedBefore),
        },
      };
    }
    if (updatedAfter) {
      where = {
        ...where,
        updatedAt: {
          [Op.lte]: parseISO(updatedAfter),
        },
      };
    }
    if (sort) {
      order = sort.split(",").map((item) => item.split(":"));
    }

    const data = await User.findAll({
      where,
      attributes: {
        exclude: ["password_hash"],
      },
      order,
      limit,
      offset: limit * page - limit,
    });

    return res.json(data);
  }

  async show(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json();

    const { id, name, email, createdAt, updatedAt } = user;

    return res.json({ id, name, email, createdAt, updatedAt });
  }

  async create(req, res) {
    const schema = YUP.object().shape({
      name: YUP.string().required(),
      email: YUP.string().email().required(),
      password: YUP.string().required().min(8),
      passwordConfirmation: YUP.string().when("password", (password, field) =>
        password ? field.required().oneOf([YUP.ref("password")]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "error on validate schema" });
    }

    const { id, name, email, createdAt, updatedAt } = await User.create(
      req.body
    );

    return res.status(201).json({ id, name, email, createdAt, updatedAt });
  }

  async update(req, res) {
    const schema = YUP.object().shape({
      name: YUP.string(),
      email: YUP.string().email(),
      oldPassword: YUP.string().min(8),
      password: YUP.string()
        .min(8)
        .when("oldPassword", {
          is: (oldPassword) => oldPassword,
          then: () => YUP.string().required(),
        }),
      passwordConfirmation: YUP.string().when("password", {
        is: (password) => password,
        then: (field) => field.required().oneOf([YUP.ref("password")]),
      }),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "error on validate schema" });
    }

    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json();

    const { oldPassword } = req.body;

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: "user password not match" });
    }

    const { id, name, email, createdAt, updatedAt } = await user.update(
      req.body
    );

    return res.status(201).json({ id, name, email, createdAt, updatedAt });
  }

  async destroy(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json();

    await user.destroy();

    return res.json({ message: "successfully deleted user" });
  }
}

export default new UsersController();
