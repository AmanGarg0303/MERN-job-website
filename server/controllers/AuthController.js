import UserModel from "../modals/UserModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Registering a new user
export const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;

  const newUser = new UserModel(req.body);

  const { username, email } = req.body;

  try {
    const oldUser = await UserModel.findOne({ username });
    const oldUserEmailCheck = await UserModel.findOne({ email });

    if (oldUser) {
      return res
        .status(400)
        .json({ message: "This username is already registered!" });
    }

    if (oldUserEmailCheck) {
      return res
        .status(400)
        .json({ message: "This email is already registered!" });
    }

    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.SEC_KEY, {
      expiresIn: "24h",
    });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      const valid = bcrypt.compareSync(password, user.password);

      if (!valid) {
        res.status(400).json("Wrong credentials");
      } else {
        const token = jwt.sign(
          { username: user.username, id: user._id },
          process.env.SEC_KEY,
          { expiresIn: "24h" }
        );
        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json("User does not exist!"); //404 not found
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
