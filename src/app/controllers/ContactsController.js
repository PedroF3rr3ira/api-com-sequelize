import { Op } from "sequelize";
import * as YUP from "yup";
import { parseISO } from "date-fns";
import Customer from "../models/Customer";
import Contact from "../models/Contact";

class ContactsController {
  // Listagem
  async index(req, res) {
    const {
      name,
      email,
      status,
      createdBefore,
      createdAfter,
      updatedBefore,
      updatedAfter,
      sort,
    } = req.query;

    const page = req.query.page || 1;
    const limit = req.query.limit || 25;

    let where = { customer_id: req.params.customerId };
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
    if (status) {
      where = {
        ...where,
        status: {
          [Op.in]: status.split(",").map((item) => item.toUpperCase()),
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

    const data = await Contact.findAll({
      where,
      include: [
        {
          model: Customer,
          attributes: ["id", "status"],
          required: true,
        },
      ],
      order,
      limit,
      offset: limit * page - limit,
    });

    return res.json(data);
  }

  async show(req, res) {
    const contact = await Contact.findOne({
      where: {
        customer_id: req.params.customerId,
        id: req.params.id,
      },
      attributes: {
        exclude: ["customer_id", "CustomerId"],
      },
    });

    if (!contact) {
      return res.status(404).json();
    }

    return res.json(contact);
  }

  async create(req, res) {
    const schema = YUP.object().shape({
      name: YUP.string().required(),
      email: YUP.string().email().required(),
      status: YUP.string().uppercase(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "error on validate schema" });
    }

    const contact = await Contact.create({
      ...req.body,
      customer_id: req.params.customerId,
    });

    return res.status(201).json(contact);
  }

  async update(req, res) {
    const schema = YUP.object().shape({
      name: YUP.string(),
      email: YUP.string().email(),
      status: YUP.string().uppercase(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "error on validate schema" });
    }

    const contact = await Contact.findOne({
      where: {
        id: req.params.id,
        customer_id: req.params.customerId,
      },
      attributes: {
        exclude: ["customer_id", "CustomerId"],
      },
    });

    if (!contact) {
      return res.status(404).json();
    }

    (await contact).update(req.body);

    return res.json(contact);
  }

  async destroy(req, res) {
    const contact = await Contact.findOne({
      where: {
        id: req.params.id,
        customer_id: req.params.customerId,
      },
    });

    if (!contact) {
      return res.status(404).json();
    }

    await contact.destroy();

    return res.json();
  }
}

export default new ContactsController();
