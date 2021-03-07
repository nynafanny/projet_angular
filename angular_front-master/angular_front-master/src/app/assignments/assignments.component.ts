import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  assignmentSelectionne: Assignment;
  // tableau des assignments
  assignments: Assignment[];
  delivered: Boolean;
  constructor(private assignmentService: AssignmentsService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if(!this.authService.loggedIn()){
      this.router.navigate(['/authentication'])
      console.log('redirection!!!!')
    }
    console.log('Demande des assignments via le service...');    
        this.assignmentService.getAssignments().subscribe((assignements) => {
        this.assignments = assignements;
        console.log('Données reçues...');
        });

        console.log('getAssignments appelé....');
      }

    

  // tslint:disable-next-line:typedef
  assignmentClique(a: Assignment) {
    console.log('Assignment cliqué : ' + a.title);
    this.assignmentSelectionne = a;
  }

  // tslint:disable-next-line:typedef
  onNouvelAssignment(newAssignment: Assignment) {
    // this.assignments.push(newAssignment);
    this.assignmentService.addAssignment(newAssignment).subscribe((message) => {
      // on ne rentre ici que quand l'ajout (insert) a bien été
      // effectué !
      console.log(message);
    });

    
    // et on cache le formulaire et on réaffiche la liste à jour
    // this.formVisible = false;
  }
  
  colorTest(delivered:Boolean):String {
    return (this.delivered) ? "blue": "red"
  }
}
