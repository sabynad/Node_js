let express = require('express');
let router = express.Router();

/* On récupère les valeurs mises en session*/
router.get('/', (req, res) => {
  const loggedIn =req.session.loggedIn || false;
  const email = req.session.email || '';
  var title = 'Bienvenue';
  res.render('home', { loggedIn, email, title });
})


   module.exports = router;


