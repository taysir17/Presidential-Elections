const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');
const auth = require('../middleware/auth');
const authorize = require("../middleware/authorize");

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: The comments managing API
 */

 /**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - userId
 *         - candidateId
 *         - content
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the comment
 *         userId:
 *           type: string
 *           description: The ID of the user who made the comment
 *         candidateId:
 *           type: string
 *           description: The ID of the candidate being commented on
 *         content:
 *           type: string
 *           description: The content of the comment
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the comment was created
 *       example:
 *         id: d5fE_asz
 *         userId: 60d0fe4f5311236168a109ca
 *         candidateId: 60d0fe4f5311236168a109cb
 *         content: This is a comment.
 *         createdAt: 2024-11-15T15:16:07.557Z
 */

/**
 * @swagger
 * /api/comments/addComment:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
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
 *               candidateId:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: The comment was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/comments/candidate/{candidateId}:
 *   get:
 *     summary: Get comments by candidate id
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: candidateId
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidate id
 *     responses:
 *       200:
 *         description: The list of comments for the candidate
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: The candidate was not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/comments/deleteComment/{id}:
 *   delete:
 *     summary: Delete the comment by id
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *     responses:
 *       200:
 *         description: The comment was successfully deleted
 *       404:
 *         description: The comment was not found
 *       500:
 *         description: Some server error
 */

// Routes pour la gestion des commentaires
router.post('/addComment', CommentController.createComment);
router.get('/candidate/:candidateId', CommentController.getCommentsByCandidate);
router.delete('/deleteComment/:id', CommentController.deleteComment);

module.exports = router;