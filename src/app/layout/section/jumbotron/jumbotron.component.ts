import { Component } from '@angular/core';
import { ImgDirective } from '../../../directives/img.directive';

@Component({
  selector: 'app-jumbotron',
  standalone: true,
  imports: [ImgDirective],
  templateUrl: './jumbotron.component.html',
  styleUrl: './jumbotron.component.scss'
})

export class JumbotronComponent {

}
