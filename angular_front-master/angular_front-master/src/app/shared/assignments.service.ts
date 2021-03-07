import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { baseUrl } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {  
  constructor(
    private loggingService: LoggingService,
    private http: HttpClient
  ) {}

  url = 'http://127.0.0.1:8010/api/assignments';

  getAssignments(): Observable<Assignment[]> {
    console.log('Dans getAssignments dans le service...');
    this.loggingService.log('tous les assignments', 'ont été recherchés'); 
    return this.http.get<Assignment[]>(`${baseUrl}/assignments`);
  }

  getAssignment(id: number): Observable<Assignment> {
    console.log('Dans getAssignment dans le service id=' + id);
    this.loggingService.log('Assignment id=' + id, 'a été recherché');


    return this.http.get<Assignment>(baseUrl + '/assignments/' + id);
    /*
    .pipe(
      map((a) => {
        a.nom += ' MODIFIE';
        return a;
      }),
      map((a) => {
        a.nom += ' MODIFIE2 ';
        return a;
      }),
      tap((a) => {
        console.log(' ici une trace pour le debug :' + a.nom);
      }),
      catchError(this.handleError<any>('getAssignments'))
    );
    */
  }
  // tslint:disable-next-line:typedef
  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }

  addAssignment(assignment: Assignment): Observable<any> {
    // this.assignments.push(assignment);
    this.loggingService.log(assignment.title, 'a été ajouté');

    return this.http.post(this.url, assignment);
  }

  // updateAssignment(assignment: Assignment): Observable<any> {
  //   /*
  //   this.assignments.forEach((a, index) => {
  //     if (a === assignment) {
  //       this.assignments[index] = a;
  //     }
  //   });
  //   */
  //   this.loggingService.log(assignment.title, 'a été mis à jour');

  //   return this.http.put(this.url, assignment);
  // }


  updateAssignment(assignment: Assignment){
    return this.http.post<any>(`${baseUrl}/auth/login`, assignment)
  }

  
  deleteAssignment(assignment: Assignment): Observable<any> {
    /*
    this.assignments.forEach((a, index) => {
      if (a === assignment) {
        // suppression d'un élément du tableau
        // splice(position, nb elements à supprimer)
        this.assignments.splice(index, 1);
      }
    });
    */
    this.loggingService.log(assignment.title, 'a été supprimé');

    return this.http.delete(this.url + '/' + assignment._id);
  }
}
