const Candidate = require('../models/Candidate');

// Create a candidate
exports.createCandidate = async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    const photoUrl = req.file ? req.file.path : null;
    candidate.photo = photoUrl;
    await candidate.save();
    res.status(201).json({ message: 'Candidate created successfully', candidate });
  } catch (error) {
    res.status(500).json({ message: 'Error creating candidate', error });
  }
};


// Récupérer tous les candidats
exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving candidates', error });
  }
};

// Récupérer un candidat par ID
exports.getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving candidate', error });
  }
};

// Mettre à jour un candidat
exports.updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.status(200).json({ message: 'Candidate updated successfully', candidate });
  } catch (error) {
    res.status(500).json({ message: 'Error updating candidate', error });
  }
};

// Supprimer un candidat
exports.deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.status(200).json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting candidate', error });
  }
};
