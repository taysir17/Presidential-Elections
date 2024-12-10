const Election = require('../models/Election');

// Créer une élection
exports.createElection = async (req, res) => {
  try {
    const election = new Election(req.body);
    await election.save();
    res.status(201).json({ message: 'Election created successfully', election });
  } catch (error) {
    res.status(500).json({ message: 'Error creating election', error });
  }
};

// Recuperer toutes les elections
exports.getAllElections = async (req, res) => {
  try {
    const elections = await Election.find()
    .populate('candidates');
    res.status(200).json(elections);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving elections', error });
  }
};

// Recuperer une election par ID
exports.getElectionById = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id)
    .populate('candidates');    
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }
    res.status(200).json(election);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving election', error });
  }
};

// Mettre a jour une election
exports.updateElection = async (req, res) => {
  try {
    const election = await Election.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }
    res.status(200).json({ message: 'Election updated successfully', election });
  } catch (error) {
    res.status(500).json({ message: 'Error updating election', error });
  }
};

// Supprimer une election
exports.deleteElection = async (req, res) => {
  try {
    const election = await Election.findByIdAndDelete(req.params.id);
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }
    res.status(200).json({ message: 'Election deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting election', error });
  }
};
