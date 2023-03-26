const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = async (req, res = response) => {
  const { limit = 5, offset = 0 } = req.query;
  const query = { status: true };

  const [total, users] = await Promise.all([
    User.count(query),
    User.find(query).skip(offset).limit(Number(limit)),
  ]);
  res.status(403).json({ total, users });
};

const postUsers = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.status(201).json(user);
};

const putUsers = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json(user);
};

const patchUsers = async (req, res) => {
  const { id } = req.params;
  const { password, email, name, role } = req.body;

  const salt = bcryptjs.genSaltSync();
  password = bcryptjs.hashSync(password, salt);

  const user = await User.findByIdAndUpdate(
    id,
    { password, email, name, role },
    { new: true }
  );

  res.json({
    user,
  });
};

const deleteUsers = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { status: false });

  res.json({
    user,
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
};
