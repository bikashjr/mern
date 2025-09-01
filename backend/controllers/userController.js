import User from "../models/users.js";

export const  getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        if (!user) {
            res.status(404).json({ message: "User not found" })
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const updateMe = async (req,res) => {
    try {
        const update = {
            userName : req.body.userName,
            bio : req.body.bio,
            avatar : req.body.avatar,
        };
        const updateUser = await User.findByIdAndUpdate(req.user.id,update,{new: true,runValidators: true}).select("-password")
        res.json(updateUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getAllUsers = async (req,res) => {
try {
    const users = await User.find().select("-password")
    res.json(users)
} catch (error) {
    res.status(500).json({ message: error.message })
}
}