const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//Signup
exports.signup = async (req, res) => {
    let data = req.body;
    const photoUrl = req.file ? req.file.path : null;
    data.profilePicture = photoUrl;

    try {
        let existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return res.status(400).send('L\'email est déjà utilisé.');
        }

        let user = new User(data);

        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(data.password, salt);

        let savedUser = await user.save();
        res.status(200).send(savedUser);
    } catch (err) {
        console.error('Erreur lors de la création du compte :', err);
        res.status(500).send('Erreur lors de la création du compte.');
    }
};

// Login
exports.login = (req, res) => {
    let data = req.body;
    User.findOne({ email: data.email })
        .then((user) => {
            if (!user) {
                return res.status(400).send('Mail invalid!');
            }
            bcrypt.compare(data.password, user.password, (err, valid) => {
                if (err) return res.status(500).send('Error occurred: ' + err.message);
                if (!valid) return res.status(400).send('Password invalid!!');

                let payload = {
                  _id: user._id,
                  email: user.email,
                  fullname: user.name + ' ' + user.lastname,
                  role: user.role  // Ensure the role is included in the payload
                };
                
                let token = jwt.sign(payload, '123456789');  // Use a strong secret for production
                res.status(200).send({ mytoken: token, role: user.role, _id: user._id });  // Send token and role back
                
            });
        })
        .catch((err) => {
            res.status(400).send('Error occurred: ' + err.message);
        });
};

// Recuperer un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Check if password is provided and hash it before saving
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    // If a file is uploaded, add the profile picture path to updateData
    if (req.file) {
      updateData.profilePicture = req.file.path; 
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};



