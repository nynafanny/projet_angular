import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  constructor() {}

  // tslint:disable-next-line:typedef
  log(assignmentName: string, action: string) {
    console.log(assignmentName + ' ' + action);
  }

  
}
