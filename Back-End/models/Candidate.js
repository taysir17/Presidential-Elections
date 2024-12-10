const mongoose = require('mongoose');
const { Schema } = mongoose;

const candidateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  party: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Candidate', candidateSchema);
