const Vote = require('../models/Vote');

// Ajouter un vote
exports.castVote = async (req, res) => {
  try {
    const existingVote = await Vote.findOne({
      userId: req.body.userId,  // Change from req.user._id to req.body.userId
      electionId: req.body.electionId,
    });
    

    if (existingVote) {
      return res.status(400).json({ message: 'You have already voted in this election.' });
    }

    const voteData = {
      ...req.body,
      userId: req.body.userId,
    };

    const vote = new Vote(voteData);
    await vote.save();

    res.status(201).json({ message: 'Vote cast successfully', vote });
  } catch (error) {
    res.status(500).json({ message: 'Error casting vote', error });
  }
};


// Récupérer les votes d'une élection
exports.getVotesByElection = async (req, res) => {
  try {
    const votes = await Vote.find({ electionId: req.params.electionId });
    res.status(200).json(votes);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving votes', error });
  }
};

// Récupérer les votes d'un candidat
exports.getVotesByCandidate = async (req, res) => {
  try {
    const votes = await Vote.find({ candidateId: req.params.candidateId });
    res.status(200).json(votes);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving votes', error });
  }
};
