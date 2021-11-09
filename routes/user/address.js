/* ******************************************************
   ******************************************************
   **                                                  **
   **--------------------------------------------------**
   **--------------------------------------------------**
   **  Name : 2.2 QUESTION IN MERNSTACK                **
   **  From : HangingPanda Private Limited             **
   **  DEV  : Pradip Golui                             **
   **  Technologies used : Nodejs, Expressjs,MongoDB   **
   **  Date : 9-11-2021                                **
   **  Desc : Creating a address route for store       **
   **         address of a user using access token.    **
   **--------------------------------------------------**
   **--------------------------------------------------**
   **                                                  **
   ******************************************************
   ******************************************************
*/
// Here defining the address route of @POST type
// Imporiting the dependencis from node_module directory
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
const authentication = require('../../middleware/authentication');

// Importing the user, access_token & address models from the directory ./models
const User = require('../../models/User');
const Access_Token = require('../../models/Access_Token');
const Address = require('../../models/Address');



// Defining the address for request or response
router.post('/',(req, res)=>res.send('Address API is Running....'));

module.exports = router;
