const express = require('express');
const { createSession, getSessionById, getMySessions, deleteSession, seedSessions } = require('../controllers/sessionController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', protect, createSession);
router.post('/seed', protect, seedSessions);
router.get('/my-sessions', protect, getMySessions);
router.get('/:id', protect, getSessionById);
router.delete('/:id', protect, deleteSession);

module.exports = router;
