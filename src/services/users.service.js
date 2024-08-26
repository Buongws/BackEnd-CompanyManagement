import { hash, compare } from "bcrypt";
import pkg from "jsonwebtoken";
import prisma from "../../prisma/prismaClient.js";

const { sign } = pkg;

class UserService {
  async register(data) {
    const { username, password, employeeNumber } = data;

    // Check if the username already exists
    const existingUser = await prisma.users.findUnique({
      where: { username },
    });

    if (existingUser) {
      throw new Error("Username already exists");
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create the new user
    const newUser = await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
        employeeNumber,
      },
    });

    return newUser;
  }

  async login(data) {
    const { username, password } = data;

    const user = await prisma.users.findUnique({
      where: { username },
    });

    if (!user) {
      return null;
    }

    await compare(password, user.password);

    const token = sign(
      { username, employeeNumber: user.employeeNumber },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return token;
  }
}

export default new UserService();
