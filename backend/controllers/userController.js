import User from '../models/userModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import bcrypt from 'bcryptjs/dist/bcrypt.js'
import createToken from '../util/createToken.js';

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username, email, password)

    if (!username || !email || !password) {
        throw Error('Please fill all input fields')
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) res.status(400).send('User already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
        username, email, password
    });

    try {
        await newUser.save();
        createToken(res, newUser._id);
        res.status(201).json({ _id: newUser._id, username: newUser.username, email: newUser.email, isAdmin: newUser.isAdmin });
    } catch (error) {
        res.status(400);
        throw new Error('Invalid data');
    }
})

export { createUser };