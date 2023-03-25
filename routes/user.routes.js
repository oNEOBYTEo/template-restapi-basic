const { Router } = require('express');
const {
  getUsers,
  postUsers,
  putUsers,
  pathcUsers,
  deleteUsers,
} = require('../controllers/user.controller');

const router = Router();

router.get('/', getUsers);

router.post('/', postUsers);

router.put('/:id', putUsers);

router.patch('/', pathcUsers);

router.delete('/', deleteUsers);

module.exports = router;
