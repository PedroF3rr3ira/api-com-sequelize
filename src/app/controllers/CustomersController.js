import Customer from "../models/Customer";

class CustomersController {
  // Listagem
  async index(req, res) {
    const data = await Customer.findAll({ limit: 1000 });

    return res.json({ data });
  }
}

export default new CustomersController();
