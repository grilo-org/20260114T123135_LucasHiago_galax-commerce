import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  private formFields: any;

  setValue(value: any): void {
    this.formFields = value;
  }

  getValue(): any {
    return this.formFields;
  }
}
