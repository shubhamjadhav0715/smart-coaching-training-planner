const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUsersByRole,
  updateUser,
  deleteUser,
  getSystemStats
} = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');

router.use(protect);
router.use(authorize('admin'));

router.get('/users', getAllUsers);
router.get('/users/role/:role', getUsersByRole);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/stats', getSystemStats);

module.exports = router;
