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
const bcrypt = express('bcrypt');
const{check, validationResult} = require('express-validator');
// Importing User model for user collection
const User = require('../../models/User');      //      const salt = await bcrypt.genSalt(10);
// user.password = await bcrypt.hash(password,salt);
// console.log(c1);

// For response/request for login route in ./route/api/login || validating the username and password
router.post('/',
    [
      check('userName','Please enter a valid username for login').not().isEmpty(),
      check('password','Please enter the valid password for login').not().isEmpty()
    ],
// Checking the data what comes from postman and validating them the basis User model constrant
async (req,res) =>
 {
    const errors = validationResult(req);
    if(!errors.isEmpty())
      {
        return res.status(500).json({errors:errors.array() });
      }

// Collecting the value of some needed field form Postman side
    const{userName,password} = req.body;

    const user = await User.findOne({userName:req.body.userName});

    try
    {

      const bcrypt = require ('bcrypt');


      const saltRounds = 10;
      c = user.password;
      c1 = req.body.password;

      // Issue not resolve
      var passwordd = c1;  // Original Password
      var password2 = c;
      bcrypt.hash(passwordd, saltRounds, function(err, hash) { // Salt + Hash
      bcrypt.compare(password2, hash, function(err, result) {  // Compare
    // if passwords match
    if (result) {
      res.status(200).json("user exist || password ARE Match || Login Successfully ||  Access token:"+user._id);
      console.log(user);
    }
    // if passwords do not match
    else {
      res.status(500).json("user doesn't exist");
      console.log('user not exist Or password MisMatch');
    }
  });
});

      //      const salt = await bcrypt.genSalt(10);
      // user.password = await bcrypt.hash(password,salt);
      // console.log(c1);

    }catch(err){
      console.error(err.message);
      res.status(500).send('userName or password mismatch');
        // console.log(p);

    }

});
module.exports = router;
