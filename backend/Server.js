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
const url = "mongodb+srv://sahil310g:thm3CJocluBRnYY4@cluster0.pejowqh.mongodb.net/chatDB?retryWrites=true&w=majority";
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

// Creating a socket connection
const socket = require("socket.io");
const { Configuration, OpenAIApi } = require("openai");
const key = "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";
const configuration = new Configuration({
    apiKey: key,
});
const openai = new OpenAIApi(configuration);
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
        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chatHistory,
        });
        socket.emit("receiveMessage", {
            message: `${chatCompletion.data.choices[0].message.content}`,
        });
        chatHistory.push(chatCompletion.data.choices[0].message);
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
            // id: uuidv4(),
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