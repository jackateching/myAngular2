const router = require('express').Router();
const userController = require('../controllers/user');
const roomController = require('../controllers/room');
const logController = require('../controllers/log');
const { verifyToken, isEmployee, isAdmin } = require('../middleware/auth');
const { getAllRooms } = require('../controllers/room');

// Register a new User
router.post('/register', userController.register);

// Login
router.post('/login', userController.login);

// Create a room
router.post('/createroom', verifyToken, roomController.createRoom);

// Get all rooms, only users
router.get('/rooms', verifyToken, roomController.getAllRooms);

// Get a specific room, only users
router.get('/rooms/:id', verifyToken, roomController.getOneRoom);

// Get all users, only admin
router.get('/users', verifyToken, isAdmin, userController.getAllUsers);

// Get a specific user, only admin
router.get('/users/:id', verifyToken, isAdmin, userController.getOneUser);

// Update a room
router.put('/rooms/:id', verifyToken, roomController.updateOneRoom);

// Update a user
router.put('/users/:id', verifyToken, isAdmin, userController.updateOneUser);

// Delete a room
router.delete('/rooms/:id', verifyToken, isAdmin, roomController.deleteRoom);

// Delete a user
router.delete('/users/:id', verifyToken, isAdmin, userController.deleteUser);

// Get log
router.get('/logs', logController.getLog);

// //test
// router.get('/test', verifyToken, roomController.test);

module.exports = router;