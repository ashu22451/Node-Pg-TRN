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

// Defining the error for address collection that will be stored
const{ check, validationResult } = require('express-validator');

// Importing the user, access_token & address models from the directory ./models
const User = require('../../models/User');
const Access_Token = require('../../models/Access_Token');
const Address = require('../../models/Address');

// Defining the address for request or response
// Checking errors and validation here for correct data with express-validator
router.post('/',
   [
     check('user_id','Please enter valid userid').not().isEmpty(),
     check('address','Please enter valid address').not().isEmpty(),
     check('city','Please enter your correct city name').not().isEmpty(),
     check('state','Please enter your correct state name').not().isEmpty(),
     check('pincode','Please enter your valid pincode').not().isEmpty(),
     check('phone_no','Please enter your valid phone number').not().isEmpty()
   ],
   async(req, res) => {
     const errors = validationResult(req);

     if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array()});
     }

     // Collecting data from postman site in here
     const { user_id, address, city, state, pincode, phone_no } = req.body;

     try{

      let addresss = await Address.findOne({city});

      if(address)
        {
          res.status(200).json('Your address successfully save associated user profile');
        }


      // Intanciation of a Address type of object for storing data into the Address collection on database
      addresss = new Address(
        {
         user_id,
         address,
         city,
         state,
         pincode,
         phone_no
      });

      await addresss.save();

     }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
     }
   }
);

module.exports = router;
