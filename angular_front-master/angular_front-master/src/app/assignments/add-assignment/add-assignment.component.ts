import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import {FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})

export class AddAssignmentComponent implements OnInit {
  // pour le formulaire  
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thridFormGroup:  FormGroup;
  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    //formulaire Devoir
    this.firstFormGroup = this._formBuilder.group({
      titleCtrl: ['', Validators.required],
      markCtrl: ['', Validators.required],
      end_dateCtrl: ['', Validators.required],
      deliveredCrtl: [false]
    });
    // formulaire Professeur
    this.secondFormGroup = this._formBuilder.group({
      full_nameCtrl: ['', Validators.required],
      profilCtrl: ['', Validators.required]
    });

    // formulaire Etudiant
    this.thridFormGroup = this._formBuilder.group({
      student_full_nameCtrl: ['', Validators.required]
    });    
  }
  submitForm(){
    console.log(this.firstFormGroup.controls);
    console.log(this.secondFormGroup.controls)
    console.log(this.thridFormGroup.controls)
  }
  // tslint:disable-next-line:typedef
  onSubmit(event) {
    // evite la soumission standard du formulaire, qui génère un warning
    // dans la console...
    event.preventDefault();

    console.log(
      // 'Dans submit nom = ' + this.nomDevoir + ' date = ' + this.dateDeRendu
    );
    
    const newAssignment = new Assignment();
    // newAssignment.id = Math.floor(Math.random() * 1000000);
    // newAssignment.title = this.nomDevoir;
    // newAssignment.end_date = this.dateDeRendu;
    // newAssignment.delivered = false;

    // on va utiliser directement le service
    this.assignmentsService
      .addAssignment(newAssignment)
      .subscribe((reponse) => {
        console.log(reponse.message);

        // il va falloir naviguer de nouveau vers la page d'accueil
        // on va devoir faire l'équivalent du routerLink="/home" mais
        // par programme...
        // on retourne à la page d'accueil
        this.router.navigate(['/']);
      });
  }
}
