const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var connection = require('../database.js')

// A l'ouverture de la page, on affiche la vue "login.ejs", le formulaire..
router.get('/', (req, res) => {
  res.render('login', { message: '' , title: 'Login'});
});


// On récupère les données du formulaire [ C'est un post, elles sont dans le body, identifiées par leur nom] 
// et on les traite
router.post('/', (req, res) => {
  const { email, password } = req.body;
  

  // Vérification si l'utilisateur existe
  // On cherhe dans la bdd la correspondance avec l'email entré par l'utilisateur
  connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    //si le tableau résults est vide, 
    if (results.length === 0) {
      res.render('login', { message: 'Aucun utilisateur avec cette adresse mail', title: 'Login' });

    // sinon (il y a une adresse mail correspondante)
    } else {
      // Vérification du mot de passe : on hashe le mot de passe entré par l'utilisateur, et on compare
      // le résultat obtenu avec celui en bdd (results[0]).password )
      const match =  bcrypt.compare(password, results[0].password,
            (err, result) => {
                if (err) throw err;

                // Si result true, on ecrit en session les variables loggedIn et email.
                if (result) {
                  req.session.loggedIn = true;
                  req.session.email = email;

                  // on renvoie sur /home
                  res.redirect('/home');
                //si result false, on renvoe vers le formulaire, avec un message d'erreur  
                } else {
                  res.render('login', { message: 'Mot de passe incorrect', title: 'Login'});
                }
              });
          }
        });
      });
      
      module.exports = router;