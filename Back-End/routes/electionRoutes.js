const express = require('express');
const router = express.Router();
const ElectionController = require('../controllers/ElectionController');
const auth = require('../middleware/auth');
const authorize = require("../middleware/authorize");

/**
 * @swagger
 * tags:
 *   name: Elections
 *   description: The elections managing API
 */

/**
 * @swagger
 * /api/elections/addElection:
 *   post:
 *     summary: Create a new election
 *     tags: [Elections]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               isActive:
 *                 type: boolean
 *               candidates:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: The election was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Election'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/elections/getElections:
 *   get:
 *     summary: Returns the list of all the elections
 *     tags: [Elections]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the elections
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Election'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/elections/getElection/{id}:
 *   get:
 *     summary: Get the election by id
 *     tags: [Elections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The election id
 *     responses:
 *       200:
 *         description: The election description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Election'
 *       404:
 *         description: The election was not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/elections/updateElection/{id}:
 *   put:
 *     summary: Update the election by id
 *     tags: [Elections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The election id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Election'
 *     responses:
 *       200:
 *         description: The election was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Election'
 *       404:
 *         description: The election was not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/elections/deleteElection/{id}:
 *   delete:
 *     summary: Delete the election by id
 *     tags: [Elections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The election id
 *     responses:
 *       200:
 *         description: The election was successfully deleted
 *       404:
 *         description: The election was not found
 *       500:
 *         description: Some server error
 */

// Routes pour la gestion des élections
router.post('/addElection',  ElectionController.createElection);
router.get('/getElections',  ElectionController.getAllElections);
router.get('/getElection/:id',  ElectionController.getElectionById);
router.put('/updateElection/:id',  ElectionController.updateElection);
router.delete('/deleteElection/:id',   ElectionController.deleteElection);

module.exports = router;
