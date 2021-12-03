/* ******************************************************
   ******************************************************
   **                                                  **
   **--------------------------------------------------**
   **--------------------------------------------------**
   **  Name : Question 1.2                             **
   **  Desc : Checking user exist or not on the basis  **
   **         Email address, after varified user       **
   **         return user id of User                   **
   **         collection(objectId)                     **
   **--------------------------------------------------**
   **--------------------------------------------------**
   **                                                  **
   ******************************************************
   ******************************************************
*/
// Creating user login route for login access for existing user
// Importing the dependencies from package.json
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const authentication = require('../../middleware/authentication');
const jwt = require('jsonwebtoken');
const config = require('config');

// Defining and importing the validation for errors handling
const{check, validationResult} = require('express-validator');

// Importing User model for user collection
const User = require('../../models/User');

// Request & Respose for this route
router.get('/', authentication, async(req, res) =>{
  // Accessing the user id of current user except password for security reason or more
  try
   {
     const user = await User.findById(req.user.id).select('-password');
     res.json(user);
   }
  catch(err)
   {
    console.error(err,message);
    res.status(500).send('Server error');
   }
});

// Checking that user exixts or not in the database
// Taking email and password from postman side
// Varifying the user email address and password is correct or not
// Creating the new route post type

router.post('/',
    [
      check('email','Please enter a valid email address for login || Check email').isEmail(),
      check('password','Please enter correct password for login || Check Password').exists()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()});
      }

      const{email, password} = req.body;

      try
       {
          let user = await User.findOne({email});
          if(!user)
           {
             return res.status(400).json({errors:[{msg:'Invalid email or password || Enter the correct details'}]});
           }

           // Comparing the between user.password from user collection with user enter password from Postman
           const isMatch = await bcrypt.compare(password, user.password);

           if(!isMatch)
            {
              return res.status(400).json({errors:[{msg:'Invalid Email or Password || Check'}]});
            }

            // payload here for contain user data to
            const payload = {
              user : {
                id: user.id
              }
            }
            jwt.sign(
              payload,
              config.get('jwtToken'),
              {expiresIn:3600},
              (err, token) => {
                if(err) throw err;
                res.json({token});
              }
            );
       }
       catch(err)
        {
          console.error(err.message);
          res.status(500).send('Server error!')
        }
  });
module.exports = router;

