# Chat Application

A simple chat application with user authentication, built using Node.js, Express, MongoDB, HTML, CSS, and JavaScript.

## Features

- User registration and login
- JWT-based authentication
- Real-time message sending and receiving
- Basic user interface for chatting

## Requirements

- Node.js
- MongoDB

## Setup

### Step 1: Install Node.js and MongoDB

#### Node.js

Download and install Node.js from the official [Node.js website](https://nodejs.org/).

Verify the installation by running:
**commands**:
node --version
npm --version

#### MongoDB

Download and install MongoDB from the official [MongoDB website](https://www.mongodb.com/try/download/community).

### Step 2: Clone the Repository

Clone this repository to your local machine:


git clone https://github.com/philips8275/chat_application.git
cd chat_application

### Step 3: Install Dependencies

Install the necessary Node.js packages:


npm install


### Step 4: Start MongoDB

Create the data directory for MongoDB:


mkdir C:\data\db


Start the MongoDB server:


mongod --dbpath "C:\data\db"


### Step 5: Configure and Run the Node.js Server

Ensure `server.js` has the correct MongoDB connection string:

mongoose.connect('mongodb://localhost:27017/messenger', {});

Start the Node.js server:


node server.js


### Step 6: Open the Application

Open the `index.html` file in your web browser. You should be able to register, log in, and start sending messages.

## File Structure


chat-application/
├── index.html
├── script.js
├── server.js
├── package.json
└── README.md


## Usage

1. **Register a new user**:
   - Open the application in your web browser.
   - Fill in the registration form and submit.

2. **Log in**:
   - Use the registered username and password to log in.

3. **Chat**:
   - After logging in, you can send and receive messages in real-time.

## API Endpoints

### Register

- **URL**: `/register`
- **Method**: `POST`
- **Body**:
  
  {
    "username": "your_username",
    "password": "your_password"
  }


### Login

- **URL**: `/login`
- **Method**: `POST`
- **Body**:
  
  {
    "username": "your_username",
    "password": "your_password"
  }


### Get Messages

- **URL**: `/messages`
- **Method**: `GET`
- **Headers**:
 
  {
    "Authorization": "Bearer <your_token>"
  }


### Post a Message

- **URL**: `/messages`
- **Method**: `POST`
- **Headers**:

  {
    "Authorization": "Bearer <your_token>"
  }

- **Body**:

  {
    "message": "your_message"
  }


## Troubleshooting

- **MongoDB connection issues**: Ensure MongoDB is running and accessible at `mongodb://localhost:27017/messenger`.
- **Node.js server errors**: Check the console output for errors and ensure all dependencies are installed.
- **Frontend issues**: Verify the HTML and JavaScript files are correctly set up and linked.

## Future Enhancements

- Store messages in a database
- Improve the user interface with CSS or a front-end framework like Bootstrap
- Add user names to the messages
- Implement more robust error handling and validation
