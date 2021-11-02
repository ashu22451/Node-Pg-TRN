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
const bodyParser = required('body-paeser');
const jsonParser = bodyParser.json();

const{check, validationResult} = require('express-validator');

// Importing the User models
const User = require('../../models/User');

router.get('/send', async (req, res, next) => {
  try
  {

    // Taking value of page , size, sort
    const { page, size, sort} = req.query;
    if(!page)
     {
       page = 1;
     }
     if(!size)
      {
        size = 10;
      }
        const limit =parseInt(size);

        const user = await User.find().sort(
          { votes: 1, _id: 1}).limit(limit)
          res.send({
            page,
            size,
            Info: user,

          });
        }
          catch(err)
           {
             console.error(err.message);
             res.status(500).json('Server error');
           }
         // Request & Respose for send
         router.post('/send', jsonParser, (req,res) =>  {
           req.body.password = bcrypt.hashSync(req.body.password,10);

           let newUser = new User({
             userName:req.body.userName,
             password:req.body.password
           })

           newUser.save().then(result=>{
             console.log(result);
           });

         })
  }
);

module.exports = router;

