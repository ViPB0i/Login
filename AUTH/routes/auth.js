const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");
//Registerr
router.post("/register", async (req, res) => {
  //Validate
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if email already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");
  //hasimg password
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedpassword,
  });

  try {
    const savedUser = await user.save();

    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  //Validate
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //checking if email already exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesnot exists");
  //password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Inavlid password");

  //Crete token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
  res.send("sucess");
});
module.exports = router;
