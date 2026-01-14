import { Component, Input } from '@angular/core';
import { CartService } from '../../cart/services/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() Item: any;
  @Input() Cart: boolean = false;

  constructor(private _cartService: CartService) {}

  addItem(item: any) {
    this._cartService.addItem(item);
    this._cartService.toggleCarVisibility(true);
  }

  removeItem(item: any) {
    this._cartService.removeItem(item);
  }
}
