import bcrypt from "bcrypt";

const UserModel = require("../../../mongodb/mongodb-schema-user");

export default async function handler(req, res) {
  // res.status(501).json({ message: "Nie ma rejestrowanka:<" });
  // return;
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });


  const newUserData = { email: email, password: encryptedPassword };

  await UserModel.create(newUserData, function (err, newUserData) {
    if (err) return err;
    res
      .status(201)
      .json({ data: newUserData.password, message: `Stworozno nowego usera` });
  });
}
