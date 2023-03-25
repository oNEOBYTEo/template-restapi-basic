const { response } = require('express');

const getUsers = (req, res = response) => {
  const { q, name, apiKey } = req.query;

  res.status(403).json({
    msg: 'get api',
    q,
    name,
    apiKey,
  });
};

const postUsers = (req, res) => {
  const { name, age } = req.body;

  res.status(201).json({
    msg: 'post APi',
    name,
    age,
  });
};

const putUsers = (req, res) => {
  const { id } = req.params;
  res.json({
    msg: 'put APi',
    id,
  });
};

const pathcUsers = (req, res) => {
  res.json({
    msg: 'patch APi',
  });
};

const deleteUsers = (req, res) => {
  res.json({
    msg: 'delete APi',
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  pathcUsers,
  deleteUsers,
};
