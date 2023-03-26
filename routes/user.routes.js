const { Router } = require('express');
const { check } = require('express-validator');

const {
  isValidRole,
  isEmailDatabase,
  existUserById,
} = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const {
  getUsers,
  postUsers,
  putUsers,

  deleteUsers,
  patchUsers,
} = require('../controllers/user.controller');

const router = Router();

router.get('/', getUsers);

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must be more than 6 letters').isLength({
      min: 6,
    }),
    check('email', 'Email not valid').isEmail(),
    check('email').custom(isEmailDatabase),
    // check('role', 'Role not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isValidRole),
  ],
  validateFields,
  postUsers
);

router.put(
  '/:id',
  [
    check('id', 'Not is a Mongo ID').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(isValidRole),
  ],
  validateFields,
  putUsers
);

router.patch(
  '/:id',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must be more than 6 letters').isLength({
      min: 6,
    }),
    check('email', 'Email not valid').isEmail(),
    check('email').custom(isEmailDatabase),
    check('role').custom(isValidRole),
  ],
  validateFields,
  patchUsers
);

router.delete(
  '/:id',
  [
    check('id', 'Not is a Mongo ID').isMongoId(),
    check('id').custom(existUserById),
  ],
  validateFields,
  deleteUsers
);

module.exports = router;
