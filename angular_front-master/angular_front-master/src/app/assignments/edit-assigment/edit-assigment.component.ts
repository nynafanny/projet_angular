import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
// import { Assignment } from '../assignment.model';
import {FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-edit-assigment',
  templateUrl: './edit-assigment.component.html',
  styleUrls: ['./edit-assigment.component.css'],
})

export class EditAssigmentComponent implements OnInit {
  assignment: Assignment;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thridFormGroup:  FormGroup;
  date:Date;
  // constructor(
  //   private assignmentsService: AssignmentsService,
  //   private router: Router,
  //   private _formBuilder: FormBuilder
  // ) {}
  // formulaire
  // nomassignment: string;
  // dateDeRendu: Date;

  // student: {
  //   full_name:String
  // };

  // assignmentData = {
  //   id: null,
  //   title: "",
  //   teacher: {
  //     full_name:'',
  //     profil: ''
  //   },
  //   illustration: String,
  //   mark: Number,
  //   delivered: Boolean,
  //   end_date: String,
  //   rendu: Boolean,    
  //   sutdent: String
  // };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assignmentsService: AssignmentsService,
    private _formBuilder: FormBuilder
  ) {}
  

  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    this.getAssignment();    
      this.firstFormGroup = this._formBuilder.group({
        titleCtrl: ["", Validators.required],
        markCtrl: ["", Validators.required],
        end_dateCtrl: ["", Validators.required],
        deliveredCrtl: [false]
      });
      // formulaire Professeur
      this.secondFormGroup = this._formBuilder.group({
        full_nameCtrl: ["", Validators.required],
        profilCtrl: ["", Validators.required]
      });
  
      // formulaire Etudiant
      this.thridFormGroup = this._formBuilder.group({
        student_full_nameCtrl: ["", Validators.required]
      });
    
  }

  submitForm(){
    console.log(this.firstFormGroup.controls);
    console.log(this.secondFormGroup.controls)
    console.log(this.thridFormGroup.controls)
  }
  // tslint:disable-next-line:typedef
  getAssignment() {
    // 1 récupérer l'id de l'assignment dans l'URL
    const id: number = +this.route.snapshot.params.id;
    console.log('COMPOSANT EDIT ID = ' + id);

    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      console.log(assignment);
      this.assignment = assignment   
      //  this.assignment.end_date = new Date(this.assignment.end_date.)   
      this.firstFormGroup = this._formBuilder.group({
        titleCtrl: [this.assignment.title, Validators.required],
        markCtrl: [this.assignment.mark, Validators.required],
        end_dateCtrl: [this.assignment.end_date, Validators.required],
        deliveredCrtl: [this.assignment.delivered]
      });   
      // formulaire Professeur
      this.secondFormGroup = this._formBuilder.group({
        full_nameCtrl: [this.assignment.teacher.full_name, Validators.required],
        profilCtrl: [this.assignment.teacher.profil, Validators.required]
      });
  
      // formulaire Etudiant
      this.thridFormGroup = this._formBuilder.group({
        student_full_nameCtrl: [this.assignment.student.full_name, Validators.required]
      });      
    });
  }

  // tslint:disable-next-line:typedef
  onSaveAssignment() {
    console.log(this.firstFormGroup.controls["titleCtrl"].value);
    this.assignment.title = this.firstFormGroup.controls["titleCtrl"].value;
    this.assignment.mark = this.firstFormGroup.controls["markCtrl"].value;
    this.assignment.end_date = this.firstFormGroup.controls["end_dateCtrl"].value;
    this.assignment.delivered = this.firstFormGroup.controls["deliveredCrtl"].value;
    this.assignment.teacher.full_name = this.secondFormGroup.controls["full_nameCtrl"].value;
    this.assignment.teacher.profil = this.secondFormGroup.controls["profilCtrl"].value;
    this.assignment.student.full_name = this.thridFormGroup.controls["student_full_nameCtrl"].value    
    // if (this.nomassignment) {
    //   this.assignment.title = this.nomassignment;
    // }

    // if (this.dateDeRendu) {
    //   this.assignment.end_date = this.dateDeRendu;
    // }

    // Si toutes les données se
 
  }
}
