/* ******************************************************
   ******************************************************
   **                                                  **
   **--------------------------------------------------**
   **--------------------------------------------------**
   **  Name : Second QUESTION IN MERNSTACK   2.2       **
   **  From : HangingPanda Private Limited             **
   **  DEV  : Pradip Golui                             **
   **  Desc : Creating Address model                   **
   **  Date : 9-11-2021                                **
   **--------------------------------------------------**
   **--------------------------------------------------**
   **                                                  **
   ******************************************************
   ******************************************************
*/
// Defining the Address models
// Importing the dependencies for mongoose liabraries
const mongoose = require('mongoose');

// Defining the Address model
const AddressSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  access_token:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'access_token'
  },
  user_id: {
    type: String,
    required: true
  },
  address: {
    type: [String],
    required: true
  },
  city:{
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  phone_no: {
    type: String,
    required: true
  }
});
module.exports = Address = mongoose.model('address',AddressSchema);
