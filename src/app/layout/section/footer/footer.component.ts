import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  simpleMenu = [
    { name: 'Produtos', link: 'products' },
    { name: 'Serviços', link: 'services' },
    { name: 'Combos', link: 'combo' }
  ];

  quickMenu = [
    { name: 'Atendimento', link: 'sac' },
    { name: 'Dúvidas', link: 'doubt' },
    { name: 'FAQ', link: 'faq' }
  ]
}
