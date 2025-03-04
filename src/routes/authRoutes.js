const express = require('express');
const { check } = require('express-validator');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post(
  '/register',
  [
    check('name', 'Name is required').trim().notEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }).trim(),
    check('userType', 'User type is required').isIn(['patient', 'medicalPersonnel', 'healthcareFacility', 'hmo']).trim()
  ],
  register
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),
    check('password', 'Password is required').exists().trim()
  ],
  login
);

module.exports = router;