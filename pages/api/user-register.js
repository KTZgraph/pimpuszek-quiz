import bcrypt from "bcrypt";

const UserModel = require("../../services/mongodb/mongodb-schema-user");

export default async function handler(req, res) {
  const { email, password } = req.body;
  console.log(" req.body: ", req.body);

  const user = await UserModel.findOne({ email: email });

  if (user) {
    res.status(400).json({ message: "User już jest zerejestrowany" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);
  const newUserData = { email: email, password: encryptedPassword };

  await UserModel.create(newUserData, function (err, newUserData) {
    if (err) return err;
    res
      .status(201)
      .json({ data: newUserData.password, message: `Stworozno nowego usera` });
  });
}
