require('dotenv').config()
let bodyParser = require("body-parser");
let assignment = require("./routes/assignments");
let user = require("./routes/users");
let express = require("express");
let mongoose = require("mongoose");
const auth = require("./middleware/auth");

let app = express();


mongoose.Promise = global.Promise;
mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
//const uri =
  //"mongodb+srv://gnanagobrice:mamson@cluster0.zqtee.mongodb.net/assignments?retryWrites=true&w=majority";
const uri =
    "mongodb+srv://gnanagobrice:mamson@angularcluster.bziz7.mongodb.net/assignments?retryWrites=true&w=majority";
// const uri2 = "mongodb://localhost:27017/assignments";


// const userUri = 
// "mongodb+srv://gnanagobrice:mamson@angularcluster.bziz7.mongodb.net/users?retryWrites=true&w=majority";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex:true
};

mongoose.connect(uri, options).then(
  () => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log(
      "vérifiez with http://localhost:8010/api/assignments que cela fonctionne"
    );
  },
  (err) => {
    console.log("Erreur de connexion: ", err);
  }
);


// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes avec le router du module express
const prefix = "/api";

/********************* Assignments *******************/
app.route(prefix + "/assignments").get(assignment.getAssignments);

app
  .route(prefix + "/assignments/:id")
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);

app
  .route(prefix + "/assignments")
  .post(auth, assignment.postAssignment)
  .put(auth, assignment.updateAssignment);

/********************* Users *******************/  
  app.route(prefix + "/users").get(auth, user.getUsers);

  app
  .route(prefix + "/users/:email")
  .get(auth, user.getUserByEmail)

//Enregistrer un utilisateur
  app.route(prefix + "/users").post(auth, user.postUser);


/* Logger l'utilisateur */

app.route(prefix + "/auth/login")
.post(user.authenticateUser)



/* Obtenir l'utilisateur connecté */
app.route(prefix + "/users/auth/me")
.get(auth, user.getUserConnected)


// déconnecter l'utilisateur
app.route(prefix + "/users/me/logout")
.get(auth, user.logOut)

// Mettre à jour un utilisateur
app.route(prefix + "/users/:email/")
.put(auth, user.updateUser)

// supprimer un utilisateur
app.route(prefix + "/users/:email/")
.delete(auth, user.deleteUser)



// On démarre le serveur
app.listen(port, () =>{
  console.log("Serveur démarré sur http://localhost:" + port);
});


module.exports = app;
