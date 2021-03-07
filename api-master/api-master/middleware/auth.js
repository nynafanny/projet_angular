const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../model/user')



// Cette fonction permet d'authentifier l'utilisateur avant d'effectuer une 
// quelconque opération pour les methodes GET, POST, PUT, DELETE
// Ce dernier devra utiliser le token obtenu à la connexion

// function auth (req, res, next) {
    
//     const token = req.header('Authorization').replace('Bearer ', '');
//     console.log("Token: "+token)
//     try {
//         const token = req.header('Authorization').replace('Bearer ', '');
//         console.log("Token: "+token)
//         data = jwt.verify(token, config.secret)
//     } catch (error) {
        
//     }
//     if (!token)
//         return res.status(403).send({ auth: false, message: 'Aucun token fournit' });
    
    
//     next();
//   });
// }



function auth (req, res, next) {    
     token = req.header('Authorization').replace('Bearer ', '');
    // var token = req.headers['x-access-token'];
    // let token = req.cookies['x-access-token'];
    
    // const token = req.headers['authorization']
    console.log(token)
    // const token = req.headers['x-access-token'];
    
    if (!token)
        return res.status(403).send({ auth: false, message: 'Aucun token fournit' });
    
    jwt.verify(token, config.secret , function(err, decoded) {
    if (err)
        // return res.status(500).send({ auth: false, message: 'Echec d\'authentification du token.' });
        return res.status(500).send({ auth: false, message: 'Echec d\'authentification du token.' });
    else{
        req.userId = decoded._id;
        console.log("decode_id:" + decoded)
        next();
    }
    // if everything good, sa   ve to request for use in other routes
    
    
    
  });
}

module.exports = auth