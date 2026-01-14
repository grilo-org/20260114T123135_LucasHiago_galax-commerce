import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialService {

  private isOpen = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpen.asObservable();

  toggleDialogVisibility(boolean: boolean = false) {
    this.isOpen.next(boolean == true ? boolean : !this.isOpen.value);
  }

  constructor() { }
}
