const { User } = require('../Database/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const createUser = async (req, res) => {
    try {
        const newUser = req.body; // email, name, and password

        let existingUser = await User.findOne({
            email: newUser.email
        })

        if (existingUser) {
            return res.status(400).send({
                message: "User already exists"
            })
        }

        let user = await User(newUser);
        await user.save();
        user = user.toJSON();
        delete user.password;

        res.status(201).send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email,password)
        const user = await User.findOne({ email }).populate('password');
        // console.log(user)
        if (!user) {
            return res.status(400).send({
                message: "User does not exist"
            })
        }
        else {
            if (user.password === password) {
                const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.SECRET);
                return res.status(200).send({token});
            }
            else {
                return res.status(400).send({
                    message: "Password is incorrect"
                })
            }
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}


const checkUserNyToken = async (req, res) => {
    try {
        const {token} = req.headers;
        const decoded = jwt.verify(token, "ASDFGH()$#BHJN<");
        if(decoded){
            return res.status(200).send({token});
        }        // const user = await User.findOne({ _id: decoded._id });
        // if (!user) {
        //     return res.status(400).send({
        //         message: "User does not exist"
        //     })
        // }
        // else {
        //     return res.status(200).send(user);
        // }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = {
    createUser,
    userLogin,
    checkUserNyToken
}