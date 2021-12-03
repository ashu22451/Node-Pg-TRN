/***************************************************************************
 ***************************************************************************
 **                                                                       **
 **                     Question 1.5                                      **
 **       Pagination:                                                     **
 **       Returning the 10 User From the User Collection From Database    **
 **                                                                       **
 ***************************************************************************
 ***************************************************************************
*/
// Returning the 10 user to a request
// Importing dependencies package.json
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = ('mongoose');


const{check, validationResult} = require('express-validator');

// Importing the User models
const User = require('../../models/User');

router.get('/users',async(req, res, next)=>{
  try{
      let{page, size}= req.query;
      if(!page){
        page =1;
      }
      if(!size){
        size =10;
      }

      const limit = parseInt(size);
      const skip = (page-1)*size;
      let users = new User();
       users = await User.find();
      res.send(users);
  }catch(err){

    console.error(err.message);
  }
});
module.exports = router;

