const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;


mongoose.connect("mongodb+srv://sahil310g:thm3CJocluBRnYY4@cluster0.pejowqh.mongodb.net/chatDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })

const userSchema = new mongoose.Schema({
    // id: String,
    email: String,
    password: String,
    chats: [],
});

const chatSchema = new mongoose.Schema({
    sender_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message:{
        type: String,
        required: true,
    },
});

const User = mongoose.model('User', userSchema);

app.post('/api/users', async function (req, res) {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
        // const passwordMatch = bcrypt.compare(password, existingUser.password);

        // if (!passwordMatch) {
        //     res.render('login',{ message: "Invalid credentials" });
        // }else{
        //     res.session.user = existingUser
        //     res.redirect('/textToSpeech')
        // }

        // res.status(200).json({ chats: existingUser.chats });
    } else {
        const newUser = new User({
            // id: uuidv4(),
            email: email,
            password: password,
            chats: [],
        });
        newUser.save()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        });
    }
});

app.listen(port);