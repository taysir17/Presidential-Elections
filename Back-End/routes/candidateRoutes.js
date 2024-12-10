const express = require('express');
const router = express.Router();
const CandidateController = require('../controllers/CandidateController');
const auth = require('../middleware/auth');
const authorize = require("../middleware/authorize");
const { upload } = require("../middleware/multerMiddleware");

/**
 * @swagger
 * tags:
 *   name: Candidates
 *   description: The candidates managing API
 */

/**
 * @swagger
 * /api/candidates/addCandidat:
 *   post:
 *     summary: Create a new candidate
 *     tags: [Candidates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               party:
 *                 type: string
 *               biography:
 *                 type: string
 *               program:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: The candidate was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/candidates/getAllCandidats:
 *   get:
 *     summary: Returns the list of all the candidates
 *     tags: [Candidates]
 *     responses:
 *       200:
 *         description: The list of the candidates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Candidate'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/candidates/getCandidat/{id}:
 *   get:
 *     summary: Get the candidate by id
 *     tags: [Candidates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidate id
 *     responses:
 *       200:
 *         description: The candidate description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 *       404:
 *         description: The candidate was not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/candidates/updateCandidat/{id}:
 *   put:
 *     summary: Update the candidate by id
 *     tags: [Candidates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidate id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Candidate'
 *     responses:
 *       200:
 *         description: The candidate was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 *       404:
 *         description: The candidate was not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/candidates/deleteCandidat/{id}:
 *   delete:
 *     summary: Delete the candidate by id
 *     tags: [Candidates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidate id
 *     responses:
 *       200:
 *         description: The candidate was successfully deleted
 *       404:
 *         description: The candidate was not found
 *       500:
 *         description: Some server error
 */

// Routes pour la gestion des candidats
router.post('/addCandidat',  upload.single('file'), CandidateController.createCandidate);
router.get('/getAllCandidats', CandidateController.getAllCandidates);
router.get('/getCandidat/:id', CandidateController.getCandidateById);
router.put('/updateCandidat/:id',  CandidateController.updateCandidate);
router.delete('/deleteCandidat/:id',  CandidateController.deleteCandidate);

module.exports = router;
