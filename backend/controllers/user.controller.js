import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import Profile from '../models/profile.model.js';
import crypto from 'crypto';

export const register = async(req, res) => { 
    try {
        const { name, username, email, password } = req.body;

        // Validate input
        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, username, email, password: hashedPassword });
        await newUser.save();

        const profile = new Profile({ userId: newUser._id });
        await profile.save();

        return res.json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: error.message });
    }
}

export const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = crypto.randomBytes(32).toString("hex");

        await User.updateOne({ _id: user._id }, { token });

        return res.json({token});
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: error.message });
    }
}

export const uploadProfilePicture = async(req, res) => {
    const {token} = req.body;
    try {
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.profilePicture = req.file.path;
        await user.save();

        return res.status(200).json({ message: "Profile picture uploaded successfully"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

export const updateUserProfile = async (req,res) => {
    const {token} = req.body;
    try {
        const 
    } catch (error) {
        return res.status(500).json({ message: error.message });    
    }
}