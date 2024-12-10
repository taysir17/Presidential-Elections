const express = require('express');
const router = express.Router();
const VoteController = require('../controllers/VoteController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Votes
 *   description: API for managing votes
 */

/**
 * @swagger
 * /api/votes/castVote:
 *   post:
 *     summary: Cast a vote
 *     tags: [Votes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user casting the vote
 *               candidateId:
 *                 type: string
 *                 description: The ID of the candidate being voted for
 *               electionId:
 *                 type: string
 *                 description: The ID of the election
 *     responses:
 *       201:
 *         description: The vote was successfully cast
 *       400:
 *         description: Bad request or invalid data
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/votes/election/{electionId}:
 *   get:
 *     summary: Get votes by election
 *     tags: [Votes]
 *     parameters:
 *       - in: path
 *         name: electionId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the election
 *     responses:
 *       200:
 *         description: List of votes for the election
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                   candidateId:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Election not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/votes/candidate/{candidateId}:
 *   get:
 *     summary: Get votes by candidate
 *     tags: [Votes]
 *     parameters:
 *       - in: path
 *         name: candidateId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the candidate
 *     responses:
 *       200:
 *         description: List of votes for the candidate
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                   electionId:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Candidate not found
 *       500:
 *         description: Internal server error
 */

// Routes for managing votes
router.post('/castVote', VoteController.castVote);
router.get('/election/:electionId', VoteController.getVotesByElection);
router.get('/candidate/:candidateId', VoteController.getVotesByCandidate);

module.exports = router;
