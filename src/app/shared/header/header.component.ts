import { Component } from '@angular/core';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private cartService: CartService){}

  toggleCart() {
    this.cartService.toggleCarVisibility();
  }

  simpleMenu = [
    { name: 'Produtos', link: 'products' },
    { name: 'Serviços', link: 'services' },
    { name: 'Combos', link: 'combo' }
  ];
}
