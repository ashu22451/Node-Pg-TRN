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
   **  Desc : Creating a access token using   **
   **         random number md5 for login user during  **
   **         login time for 1 hour time limit         **
   **--------------------------------------------------**
   **--------------------------------------------------**
   **                                                  **
   ******************************************************
   ******************************************************
*/
// Defining the access_token route for generating random numbers for a user token
// Importing the dependencies for node_module directory
const express =  require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authentication = require('../../middleware/authentication');
const config = require('config');

// Importing both User and Access_Token model from model directory
const User = require('../../models/User');
const Access_Token = require('../../models/Access_Token');

// Defining errors for throw when wrong user input in login
const { check , validationResult } = require ('express-validator');

// Defining route for access token generation & save into Access_Token Document
router.post('/',

    async(req, res) =>
    {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }

    const{user_id, access_token, expiry} = req.body;
    const{email} = req.body;

    try
    {
        let user = await User.findOne({email});

   // Create Access Token Object to storing data in collection
   let access_tokens = new Access_Token(
    {
       user_id,
       access_token,
       expiry
    }
   );

    // Defining randomNumberGenerator function for random number generate for access token for login user
   function randomNumberGenerator()
    {
      let randomCharactors = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      let length =10;

      for ( var i = 0; i < length; i++ )
         result += randomCharactors.charAt(Math.floor(Math.random() * randomCharactors.length));

    // Assining value for Access_Token collection into database
         access_tokens.user_id = user_id;
         access_tokens.access_token = result;
         access_tokens.expiry = 3600;
    }

    // Random generator function calling here
     randomNumberGenerator();

     await access_tokens.save();

    }
    catch(err)
      {
         console.error(err.message);
         res.status(500).send('Server error');
      }
});
module.exports = router;
