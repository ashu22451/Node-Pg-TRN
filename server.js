/* ******************************************************
   ******************************************************
   **                                                  **
   **--------------------------------------------------**
   **--------------------------------------------------**
   **  Name : FIRST QUESTION IN MERNSTACK              **
   **  From : HangingPanda Private Limited             **
   **  DEV  : Pradip Golui                             **
   **  Technologies used : Nodejs, Expressjs,MongoDB   **
   **  Date : 24-10-2021                               **
   **--------------------------------------------------**
   **--------------------------------------------------**
   **                                                  **
   ******************************************************
   ******************************************************
*/

// Basic server configuration for Node Server using express libraries
// Importing dependencies from package.json For Modules
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();
const router = express.Router();
// MongoDB Connected Method Here
connectDB();

// Middleware || Body-Parser use
app.use(express.json({exetended:false}));

// Using middleware functions for use APIs from routes.api directory
app.use('/user/register', require('./routes/user/register'));
app.use('/user/login',require('./routes/user/login'));
app.use('/user/get',require('./routes/user/get'));
app.use('/user/delete',require('./routes/user/delete'));
app.use('/user/list',require('./routes/user/list'));
app.use('/user/access_token',require('./routes/user/access_token'));
app.use('/user/address',require('./routes/user/address'));
// ort create for localhost in local machine
const PORT = process.env.PORT || 4000;

// Here port is listening from localhost in local machine
app.listen(PORT,()=>console.log(`Server Started at localhost at port ${PORT}`));
