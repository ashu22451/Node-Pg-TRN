/* ******************************************************
   ******************************************************
   **                                                  **
   **--------------------------------------------------**
   **--------------------------------------------------**
   **  Name : Second QUESTION IN MERNSTACK              **
   **  From : HangingPanda Private Limited             **
   **  DEV  : Pradip Golui                             **
   **  Technologies used : Nodejs, Expressjs,MongoDB   **
   **  Date : 9-11-2021                               **
   **--------------------------------------------------**
   **--------------------------------------------------**
   **                                                  **
   ******************************************************
   ******************************************************
*/

// Defining the the Access_Token for the login a user
// Importing the dependencies for use mongoose liabries
const mongoose = require('mongoose');

// Here definging the the Access_Token model for the document in collection in database

const Access_TokenSchema = new mongoose.Schema({
  user_id:{
    type: String,
    required: true
  },
  access_token:{
    type: String,
    require: true
  },
  expiry:{
    type:String
  }
});

// Exporting the Access_Token Model
module.exports = Access_Token = mongoose.model('access_token',Access_TokenSchema);


