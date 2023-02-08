const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//bcrypt
const hashPassword = (password) => bcrypt.hashSync(password);
const comparePassword = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);

//jwt
const createToken = (payload) => jwt.sign(payload, process.env.SECRET);
const verifyToken = (token) => jwt.verify(token, process.env.SECRET);

module.exports = { hashPassword, comparePassword, createToken, verifyToken };
