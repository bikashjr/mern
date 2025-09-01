import jwt from "jsonwebtoken"
import User from "../models/users.js";

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
};

export const registerUser = async (req, res) => {
    try {
        const {
            userName, email, password
        } = req.body;
        const userExists = await User.findOne({ email })
        if (userExists) return res.status(400).json({ message: "User already exists" })
        const user = await User.create({
            email, password, userName
        })
        if (user) {
            res.status(201).json({
                _id: user._id,
                userName: user.userName,
                email: user.email,
                token: generateToken(user._id)
            })
        }
        else {
            res.status(400).json({ message: "Invalid user data" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



// export const registerUser = async (req, res) => {
//     try {
//         const { userName, email, password } = req.body;

//         const userExists = await User.findOne({ email });
//         if (userExists) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         // Make the first user admin
//         const isFirstUser = (await User.countDocuments({})) === 0;

//         const user = await User.create({
//             userName,
//             email,
//             password,
//             role: isFirstUser ? "admin" : "user",
//         });

//         res.status(201).json({
//             _id: user._id,
//             userName: user.userName,
//             email: user.email,
//             role: user.role,
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                userName: user.userName,
                email: user.email,
                token: generateToken(user._id),
                message: "Login Successfull !!"
            })
        }
        else {
            res.status(401).json({
                message: "Invalid email or password"
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

