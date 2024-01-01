require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Establishing a MongoDB connection 
const url = process.env.DATABASE_URL;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const chatSchema = new mongoose.Schema({
    role: { type: String, required: true },
    content: { type: String, required: true }
});
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    chats: [chatSchema],
});
const User = mongoose.model('User', userSchema);

// Creating a socket connection
const socket = require("socket.io");
const key = process.env.OPENAI_API_KEY;
const OpenAIApi  = require('openai');
const openai = new OpenAIApi({
  api_key: key,
});

const io = new socket.Server(server, {
    path: "/api/socket.io",
    cookie: false,
    cors: { credentials: true, origin: true },
});

// Configuring a socket event handler
const chatHistory = [];
io.on("connection", (socket) => {
    socket.on("sendMessage", async (data) => {
        chatHistory.push({ role: "user", content: data.text });
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: chatHistory,
        });
        socket.emit("receiveMessage", {
            message: `${chatCompletion.choices[0].message.content}`,
        });
        console.log(chatCompletion.choices[0]);
        chatHistory.push(chatCompletion.choices[0].message);
    });

    socket.on("userEmail", async (data) => {
        const existingUser = await User.findOne({ email: data.userEmail });
        // existingUser.chats = chatHistory;

        // existingUser.save();
    });

    socket.on("disconnect", () => {
        console.log("Disconnected");
    });
});

app.post('/api/users', async function (req, res) {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    console.log(password);

    if (existingUser) {
        console.log('Existing user:', existingUser);

        const passwordMatch = (password === existingUser.password);
        if (passwordMatch) {
            console.log('Password match', existingUser.password);
            res.json({ success: true, result: existingUser });
            // Passwords match, user is authenticated
            return { success: true, existingUser };
        } else {
            console.log('Incorret');
            res.json({ success: false, message: 'Incorrect password' })
            // Passwords don't match
            return { success: false, message: 'Incorrect password' };
        }
    }
    else {
        const newUser = new User({
            email: email,
            password: password,
            chats: [],
        });
        newUser.save()
            .then(result => {
                res.json({ success: true, result });
            })
            .catch(err => {
                res.json(err);
            });
    }
});

server.listen(port);