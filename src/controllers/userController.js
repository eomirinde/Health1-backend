const User = require('../models/User');
const { encrypt, decrypt } = require('../utils/encryption');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    user.name = decrypt(user.name);
    user.email = decrypt(user.email);
    user.userType = decrypt(user.userType);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateProfile = async (req, res) => {
  const { name, email, emergencyContact, medicalInfo } = req.body;

  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.name = name ? encrypt(name) : user.name;
    user.email = email ? encrypt(email) : user.email;
    user.emergencyContact = emergencyContact ? encrypt(emergencyContact) : user.emergencyContact;
    user.medicalInfo = medicalInfo ? encrypt(medicalInfo) : user.medicalInfo;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};