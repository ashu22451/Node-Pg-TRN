// Importing dependencies from node_modules
const jwt = require('jsonwebtoken');
const config = require('config');

// Exporting a function with having header with the key to contain header parameters
module.exports = function(req, res, next)
{
// Taking the token is here
  const token =req.header('x-auth-token');

// Checking the condition in header that have token or not
  if(!token)
  {
    return res.status(401).json({msg:'Please provides token || Now your access is denied due to token'});
  }

// Checking the token is correct or not
try
  {
    jwt.verify(token, config.get('jwtToken'),(error,decoded) =>{
      if(error)
       {
         return res.status(401).json({msg:'Your given token is invalid || Please provide correct of access'});
       }
      else
      {
        req.user = decoded.user;
        next();
      }
    });
  }
  catch(err)
   {
     console.log('Something wrong here in token || Authentication, Try again!');
     res.status(500).json({ msg: 'Server error '});
   }

};
