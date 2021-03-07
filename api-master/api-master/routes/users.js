const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
// const express = require('express');
const User = require('../model/user')
const config = require('../config')


// Récupérer tous les utilisateurs (GET) (OK)
function getUsers(req, res) {
    User.find((err, users) => {
        if (err)
            res.send({err})                    
        res.send(users)
    })
}

// Récupérer un utilisateur par son id (GET) (OK)
function getUser(req, res) {
    let  = req.params.id;
    User.findOne({ id: userId }, (err, user) => {
        if (err) {
            res.send(err)
        }
        if(!user){
            res.json({"message": "Aucun utilisateur ne correspond"})
        }
        res.json(user)
    })
}
// Récupérer un utilisateur par son email (GET)  (OK)
function getUserByEmail(req, res) {
    let userEmail = req.params.email;
    User.findOne({ email: userEmail }, (err, user) => {
        if (err) {
            res.send(err)
        }
        if(!user){
            res.json({})    
        }
        res.json(user)
    })
}

// Ajouter un utilisateur (OK)
function postUser(req, res) {
    try {
        let user = new User(req.body);
        console.log("mot de passe: " + req.body.password)
        emailToCheck = req.body.email
        console.log("user email: " + emailToCheck)
        User.findOne({ email: emailToCheck }, (err, u) => {
            if (u)
                res.send({ message: "Cet email existe déja!!!" })
            else {
                console.log("POST assignment reçu :");
                console.log(user)
                // hashage du mot de passe
                bcrypt
                    .hash(user.password, 8)
                    .then(hash => {
                        user.password = hash
                        console.log(`Hash: ${hash}`);
                    }).then(() => {
                        console.log(user)
                        user.save().then(() => {
                            status = true
                            res.status(201).send({ user, status })
                        })
                    });
            }
        })
    } catch (error) {
        res.status(400).send({ error })
    }
}


// Authentifier un utilisateur (OK)
function authenticateUser(req, res, next) {    
    User.findOne({ email: req.body.email }, (err, userInfo) => {
        if (err) {
            next(err);
        } else {

            if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                const token = jwt.sign({ _id: userInfo._id }, config.secret, { expiresIn: '1h' })
                res.json({ status: "success", message: "user found!!!", data: { user: userInfo, token: token } });
            } else {
                res.json({ status: "error", message: "Email ou mot de masse invalid!!!", data: null });
            }
        }
    });
}

// Déconnecteur un utilisateur
function logOut(req, res) {    
    res.status(200).send({ auth: false, token: null });
}

function getUserConnected(req, res) {
    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("Un problème concernant l'utilisateur a éte rencontré");
        if (!user) return res.status(404).send("Aucun utilisateur trouvé.");        
        res.status(200).send(user);
      });
}

function updateUser(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    User.updateOne({email: req.params.email}, req.body, {new: true}, (err, user) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.status(200).send({message: 'updated'})
        }

      // console.log('updated ', assignment)
    });

}

function deleteUser(req, res) {
    User.deleteOne({email: req.params.email}, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json({user, rmessage: `${user.email} a été supprimé`});
    })
}




// module.exports = { getUser, postUser, getUsers, updateUser, deleteUser }
module.exports = { getUsers, getUser, getUserByEmail, postUser, authenticateUser, getUserConnected, logOut, updateUser, deleteUser }


























// const router = express.Router()

// router.post ('/users', async(req, res) => {
//     //Créer un mouvel utilisateur
//     try {
//         const user = new User(req.body)
//         await user.save()
//         const token = await user.generateAuthToken()
//         res.status(201).send({user, token })

//     }
//     catch(error){
//         res.status(400).send(error)
//     }
// })

// router.post('/users/login/', async(req, res)=>{
//     // logger un utilisateur déjà enregistrer
//     try {
//         const { email, password } = req.body
//         const user = await User.findByCredentials(email,password)
//         if(!user)
//             return res.status(401).send({error: 'Login incorrect!'})
//         const token = await user.generateAuthToken()
//         res.send({user, token})
//     }catch(error){
//         res.status(400).send(error)
//     }
// })

// module.exports = router