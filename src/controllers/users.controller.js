import MESSAGE_KEYS from "../constants/messageKeys.js";
import UserService from "../services/users.service.js";

export async function register(req, res) {
  try {
    const newUser = await UserService.register(req.body);
    if (!newUser) {
      return res.status(400).json({ message: MESSAGE_KEYS.USERNAME_EXISTS });
    }
    res.status(201).json({ message: MESSAGE_KEYS.USER_REGISTER_SUCCESS });
  } catch (error) {
    res.status(500).json({ message: MESSAGE_KEYS.SERVER_ERROR });
  }
}

export async function login(req, res) {
  try {
    const token = await UserService.login(req.body);
    if (!token) {
      return res
        .status(401)
        .json({ message: MESSAGE_KEYS.INVALID_CREDENTIALS });
    }
    res.status(200).json({ message: MESSAGE_KEYS.LOGIN_SUCCESS, token });
  } catch (error) {
    res.status(500).json({ message: MESSAGE_KEYS.SERVER_ERROR });
  }
}
