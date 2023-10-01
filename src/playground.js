import "./database";

import Customer from "./app/models/Customer";
import Contact from "./app/models/Contact";
// import Contact from "./app/models/Contact";

class Playground {
  static async play() {
    const customer = await Customer.findAll({
      include: Contact,
    });

    console.log(JSON.stringify(customer, null, 2));
  }
}
Playground.play();
