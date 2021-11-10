/* ******************************************************
   ******************************************************
   **                                                  **
   **--------------------------------------------------**
   **--------------------------------------------------**
   **  Name : 2.3 QUESTION IN MERNSTACK                **
   **  From : HangingPanda Private Limited             **
   **  DEV  : Pradip Golui                             **
   **  Technologies used : Nodejs, Expressjs,MongoDB   **
   **  Date : 9-11-2021                                **
   **  Desc : Returning the all user data with address **
   **         also that are associated with user       **
   **         user profile                             **
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
const config = require('config');
const jwt = require('jsonwebtoken');
const authentication = require('../../middleware/authentication');

// Importing the user, access_token & address models from the directory ./models
const User = require('../../models/User');
const Access_Token = require('../../models/Access_Token');
const Address = require('../../models/Address');

// request & response for the route using query parameter
// Association user document to address collection using population of mongoose libraries
// Here fatching user data from user collection also address with the help of polulate function
    router.get('/user/:_id',async(req, res)=>{
      try{
            // let user = await User.findOne({user:req.params._id}).populate({address});
            let user = await User.findOne({user:req.params._id}).populate('address',['user_id','address','city','state','pincode','phoneno']);
            if(user)
              {
                return res.status(200).json(user);
              }
            else
             {
              res.status(400).json('User not found of not exist here');
             }

      }catch(err){
        console.error(err.message);
        res.status(500).json('Server Error');
      }

    });

module.exports = router;
