const mongoose = require('mongoose');
const { Schema } = mongoose;

const voteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  candidateId: {
    type: Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true,
  },
  electionId: {
    type: Schema.Types.ObjectId,
    ref: 'Election',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Vote', voteSchema);
