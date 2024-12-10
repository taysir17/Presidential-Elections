const Comment = require('../models/Comment');

// Ajouter un commentaire
exports.createComment = async (req, res) => {
  try {
    const commentData = {
      ...req.body, 
      userId: req.body.userId // Now get userId from the body, not from the token
    };

    const comment = new Comment(commentData);
    await comment.save();
    
    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
};

// Recuperer les commentaires d'un candidat
exports.getCommentsByCandidate = async (req, res) => {
  try {
    const comments = await Comment.find({ candidateId: req.params.candidateId })
      .populate('userId', 'name email') 
      .populate('candidateId', 'name biography'); 

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving comments', error });
  }
};

// Supprimer un commentaire
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error });
  }
};
