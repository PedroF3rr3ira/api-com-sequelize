import "./database";

import Customer from "./app/models/Customer";
// import Contact from "./app/models/Contact";

class Playground {
  static async play() {
    // const customers = await Customer.findAll({
    //   include: [
    //     {
    //       model: Contact,
    //       where: {
    //         status: "ACTIVE",
    //       },
    //       required: false,
    //     },
    //   ],
    //   order: ["name"],
    //   limit: 2,
    //   offset: 2 * 1 - 2, // limit *page - limit
    // });
    const activeCustomers = await Customer.scope("active").findAll();

    console.log(activeCustomers);
  }
}
Playground.play();
