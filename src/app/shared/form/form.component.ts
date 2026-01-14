import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldsService } from './sevice/fields.service';
import { RequestsService } from '../../services/requests.service';
import { DialService } from '../dialog/sevice/dial.service';
import { SessionService } from '../../services/session/session.service';
import { CartService } from '../cart/services/cart.service';
import { BudgetItem, ExtractedId } from './sevice/budget-item';
import { NotifyService } from '../notification/service/notify.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})

export class FormComponent {
  dynamicForm!: FormGroup;
  update: boolean = false;
  fields: Array<any> = [];
  sessionId?: string;

  totalAmount: number = 0;
  itemsCart: any = [];
  itemsCartLength: any;

  constructor(
    private _fb: FormBuilder, 
    private _sharedForm: FieldsService, 
    private _request: RequestsService, 
    private _dial: DialService,
    private _session: SessionService,
    private _cart: CartService,
    private _notify: NotifyService
    ) {}

  ngOnInit(): void {
    this.getFields();
    this.genFormDynamic();
    this.getTotalAmount();
    this.getCartItems();
  }

  getFields() {
    this.fields = this._sharedForm.getValue();
    this.sessionId = this._session.createSessionUuid();
  }

  genFormDynamic() {
    const formControls: any = {};

    this.fields.forEach(_field => {
      formControls[_field.controlName] = [''];
    });

    this.dynamicForm = this._fb.group(formControls);
  }

  getTotalAmount() {
    this._cart.totalAmount$.subscribe(total => this.totalAmount = total);
  }

  getCartItems() {
    this._cart.itemsCart$.subscribe(items => {
      this.itemsCart = this.extractIds(items);
      this.itemsCartLength = Object.keys(this.itemsCart).length;
    });
  }

  extractIds(items: BudgetItem[]): ExtractedId {
    const idMap: Array<[keyof BudgetItem, keyof ExtractedId]> = [
      ['service_id', 'serviceId'],
      ['product_id', 'productId'],
      ['combo_id', 'comboItemId']
    ];

    return items.reduce((acc, item) => {
      idMap.forEach(([oldKey, newKey]) => {
        if (item[oldKey] !== undefined) {
          acc[newKey] = item[oldKey];
        } else {
          acc[newKey] = 0;
        }
      });
      return acc;
    }, {} as ExtractedId);
  }

  sendData(): void {
    let CONTROL = this.dynamicForm.controls;

    if(this.dynamicForm.valid && CONTROL['name'].value.length > 0){
      let json = {
        session_id: this.sessionId,
        name: CONTROL['name'].value,
        email: CONTROL['email'].value,
        productId: this.itemsCart.productId,
        serviceId: this.itemsCart.serviceId,
        comboItemId: this.itemsCart.comboItemId,
        quantity: this.itemsCartLength,
        budget_price: this.totalAmount
      }

      this._request.postData('budgets', json).subscribe({
        next: _u => console.log(_u),
        error: _e => console.log(_e),
        complete: () => {
          this._dial.toggleDialogVisibility();
          this._notify.setNewNotification(`Obrigado ${CONTROL['name'].value}, orçamento enviado com sucesso`, 'success');
        }
      });
    }
  }
}

