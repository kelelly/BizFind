const bcrypt = require('bcrypt');
const User = require('../models/User');
const Business = require('../models/Business');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const sendEmail = (email, subject, message) => {
  console.log(`Email sent to ${email} with subject "${subject}" and message "${message}"`);
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    if (await User.findOne({ username })) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    req.session.userId = user._id;
    req.session.email = user.email;

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const registerBusiness = async (req, res) => {
  try {
    const { name, email, password, address, phone, category, location } = req.body;

    if (await Business.findOne({ email })) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const business = new Business({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      category,
      location,
    });
    await business.save();

    req.session.userId = business._id;
    req.session.email = business.email;
    req.session.role = 'business';

    res.status(201).json({ message: 'Business registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select('+password');
    if (!user) {
      user = await Business.findOne({ email }).select('+password');
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    req.session.userId = user._id;
    req.session.email = user.email;
    req.session.role = user.role || 'user';

    res.status(200).json({ message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await Business.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'Email not found' });
      }
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetUrl = `http://your-frontend-url/reset-password?token=${token}`;
    sendEmail(user.email, 'Password Reset', `Click this link to reset your password: ${resetUrl}`);

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    let user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) {
      user = await Business.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password has been reset' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  registerUser,
  registerBusiness,
  login,
  requestPasswordReset,
  resetPassword,
};
