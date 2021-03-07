let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

let UserSchema = Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique:true       
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validator: value => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: 'Cet Email est invalide!' })
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    profil: {
        required: false,
        type: String,
    },
    isAdmin: {
        type: Boolean,
        required: false,
    },
    isActive: {
        type: Boolean,
        required: false
    },
});


// UserSchema.pre('save', async (next) => {
//     //Hash le mot de pase avec l'enregistrement de l'utilisateur     
//     console.log(" User password: " + user.password)   
//     console.log("Mon mot de passe: " + this.password)
//     saltRounds = 8
//     // this.password = await bcrypt.hash(this.password, 8)
//     user.password = "toentoentoenton"
//     bcrypt
//   .hash(user.password, saltRounds)
//   .then(hash => {
//       user.password = hash
//     console.log(`Hash: ${hash}`);
//     next();
//     // Store hash in your password DB.
//   })
//   .catch(err => console.error(err.message));
//     next()
// })

// UserSchema.methods.generateAuthToken = async () => {
//     //Génère un token pour l'utilisateur 
//     const user = this
//     const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)
//     console.log("mon token: " + token)
//     console.log("user_id: " + user._id)
//     user.tokens = user.tokens.concat({ token })
//     await user.save()
//     return token
// }

UserSchema.statics.findByCredentials = async (email, password) => {
    //Recupérer l'utilisateur ayant l'email suivant
    const user = await UserSchema.findOne({ email });
    if (!user)
        //Retourner une erreur en cas d'adresse email invalide
        throw new Error({ error: 'Cet nom d\'utilisateur n\'est pas enregistré dans notre base!' })

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch)
        throw new Error({ error: 'Veuillez saisir un mot de passe correct' })
    return user
}

const User = mongoose.model('User', UserSchema)
module.exports = User

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('User', UserSchema);
