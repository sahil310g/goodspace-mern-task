Real-time chat app with camera/microphone, OpenAI API, Socket.io, MongoDB, supporting text-to-speech and speech-to-text

**Backend Setup**
- Create .env file in backend folder
- Add OpenAI API Key in .env file by name OPENAI_API_KEY
- Go to https://platform.openai.com/ for account setup and creating Secret API key
- Add MongoDB Database url in .env file by name DATABASE_URL
- Go to https://cloud.mongodb.com/ to create a new database and copy the connection string
  
.env file
```
DATABASE_URL = "MongoDB connection string"
OPENAI_API_KEY = "OpenAI API Key"
```

- To run the backend server
```
cd backend
npm init
nodemon Server.js
```

**Frontend Setup**
```
cd frontend
npm install
npm start
```

**Project Usage**
- An interactive AI application that provides information, explanations, and guidance on various topics.
- Keeps track of previous conversations.
- Real-time chat display and interaction.
- Seamless Client-Server communication.
- Provides camera, microphone and conversion services for interaction.
