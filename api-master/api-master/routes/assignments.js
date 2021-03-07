let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }
        res.send(assignments);
    });
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;
    console.log("Le Id de l'assignment: " + assignmentId)
    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })

}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id
    assignment.title = req.body.title
    assignment.illustration = req.body.illustration
    assignment.end_date = req.body.end_date
    assignment.delivered = req.body.delivered
    assignment.mark = req.body.mark
    assignment.student.full_name = req.body.student.full_name
    assignment.teacher.full_name = req.body.teacher.full_name
    assignment.teacher.profil = req.body.teacher.profil

    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save( function(err) {
        if(err){            
            res.status(401).send({'cant post assignment ':err})
        }
        res.json({ message: `${assignment.title} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({assignment, message: 'updated'})
        }

      // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.title} deleted`});
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };