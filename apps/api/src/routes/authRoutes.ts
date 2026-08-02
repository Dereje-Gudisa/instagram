import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user account
 * @access  Public
 */
router.post('/register', register);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & get JWT token
 * @access  Public
 */
router.post('/login', login);

export default router;