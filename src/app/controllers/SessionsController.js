import jwt from "jsonwebtoken";
import User from "../models/User";

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "email or password incorrect" });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, "de2d4dba9ca94e7cd4fc69c426449b11", {
        expiresIn: "7d",
      }),
    });
  }
}

export default new SessionsController();
