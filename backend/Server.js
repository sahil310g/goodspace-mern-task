const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;
const bcrypt = require('bcrypt');

const url = process.env.DATABASE_URL;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const chatSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    message: { type: String, required: true }
});
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    chats: [chatSchema],
});


const User = mongoose.model('User', userSchema);

app.post('/api/users', async function (req, res) {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    console.log(password);

    if (existingUser) {
        console.log('Existing user:', existingUser);

        const passwordMatch = (password === existingUser.password);
        if (passwordMatch) {
            console.log('Password match', existingUser.password);
            res.json({success: true, result: existingUser });
            // Passwords match, user is authenticated
            return { success: true, existingUser };
        } else {
            console.log('Incorret');
            res.json({success: false, message: 'Incorrect password' })
            // Passwords don't match
            return { success: false, message: 'Incorrect password' };
        }
    }
    else {
        const newUser = new User({
            // id: uuidv4(),
            email: email,
            password: password,
            chats: [],
        });
        newUser.save()
            .then(result => {
                res.json({success:true, result});
            })
            .catch(err => {
                res.json(err);
            });
    }
});

app.listen(port);