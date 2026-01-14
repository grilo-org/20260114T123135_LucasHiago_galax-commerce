import { Component, OnDestroy, Type, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from './services/cart.service';
import { DialogComponent } from '../dialog/dialog.component';
import { DialService } from '../dialog/sevice/dial.service';
import { FieldsService } from '../form/sevice/fields.service';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnDestroy {
  isVisible = false;
  private subscription!: Subscription;
  itemsCart: any = [];
  totalAmount: number = 0;

  form: Type<any> = FormComponent;
  @ViewChild(DialogComponent) dialogComponent!: DialogComponent;

  fields: Array<any> = [
    { type: 'text', label: 'Nome', controlName: 'name'},
    { type: 'text', label: 'Email', controlName: 'email' }
  ];

  constructor(private cartService: CartService, private dial: DialService, private sharedForm: FieldsService){
    this.subscription = this.cartService.cartVisible$.subscribe(visible => this.isVisible = visible);
    this.feedItemsCart();
    this.getTotalAmount();
  }

  callBudget() {
    this.sharedForm.setValue(this.fields);
    this.dial.toggleDialogVisibility(true);
    this.dialogComponent.Title = `Solicitar Orçamento`;
    this.dialogComponent.loadComponent(this.form);
  }

  feedItemsCart() {
    this.cartService.itemsCart$.subscribe(items => {
      this.itemsCart = items;
      this.cartService.getTotalAmount();
    });
  }

  getTotalAmount() {
    this.cartService.totalAmount$.subscribe(total => {
      this.totalAmount = total;
    });
  }

  toggleCart() {
    this.cartService.toggleCarVisibility();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
