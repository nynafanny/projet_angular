
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Schéma du devoir
let AssignmentSchema = Schema({   
    id: Number,     
    title: String, // titre assignment
    end_date: Date, //date de livraison du devoir
    student: {
      full_name: String, //etudiant
    },
    teacher: {
      full_name: String,
      profil: String
    },    // professeur        
    delivered: Boolean, // Rendu (oui ou non)    
    illustration: String, //une photo de l'assignment
    mark: Number // La note obtenu aux devoir
});

const Assignment = mongoose.model('Assignment', AssignmentSchema)
module.exports = Assignment
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
