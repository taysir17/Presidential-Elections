const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  role: {
    type: String,
    enum: ['admin', 'voter'],
    default: 'voter',
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Candidate',
  }],
   
},
{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
