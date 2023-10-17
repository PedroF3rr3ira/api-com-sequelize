import "./database";

import bcrypt from "bcryptjs";
// import Customer from "./app/models/Customer";
// import Contact from "./app/models/Contact";
// import Contact from "./app/models/Contact";

class Playground {
  static async play() {
    const password = await bcrypt.hash("12345678", 8);

    console.log(password);
  }
}
Playground.play();
