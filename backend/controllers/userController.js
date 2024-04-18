import User from '../models/userModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username, email, password)
})

export { createUser };