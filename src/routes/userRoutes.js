const express = require('express');
const { check } = require('express-validator');
const passport = require('passport');
const { getProfile, updateProfile } = require('../controllers/userController');

const router = express.Router();

router.get('/profile', passport.authenticate('jwt', { session: false }), getProfile);

router.put(
  '/profile',
  [
    passport.authenticate('jwt', { session: false }),
    check('name', 'Name is required').trim().optional().notEmpty(),
    check('email', 'Please include a valid email').trim().optional().isEmail().normalizeEmail(),
    check('emergencyContact', 'Emergency contact is required').trim().optional().notEmpty(),
    check('medicalInfo', 'Medical information is required').trim().optional().notEmpty(),
  ],
  updateProfile
);

module.exports = router;