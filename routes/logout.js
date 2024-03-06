const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
   
    if (req.session) {
        req.session.destroy(err => {
          if (err) {
            res.status(400).send('Unable to log out')
          } else {
            res.redirect('/home');
          }
        });
      } else {
        res.end()
      }
  });

  module.exports = router;