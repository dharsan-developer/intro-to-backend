import {User} from "../models/user.models.js";

const registerUser = async (req, res) => {
try {
    const {name, email, password} = req.body;


    if (!name || !email || !password) {
        return res.status(400).json({message: "Please fill all the fields"});
    }

    const userExists = await User.findOne({email});

    if (userExists) {
        return res.status(400).json({message: "User already exists"});
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    res.status(201).json({
        message:"User registered",
        _id: user._id,
        name: user.name,
        email: user.email,
    });
} catch (error) {
    res.status(500).json({message: "Error registering user"});
    console.error(error);
}
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const isMatch = await user.isPasswordCorrect(password);

        if (!isMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = user.generateAuthToken();

         return res.status(200).json({
            message: "User logged in",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Error logging in user"});
    }
};

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({message: "User not found"});
        }
        // Here you would typically invalidate the user's token
        return res.status(200).json({message: "User logged out"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "internal server error"});
    }
};

export {
    registerUser,
    loginUser,
    logoutUser
};