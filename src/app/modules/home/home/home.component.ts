import { Component } from '@angular/core';
import { JumbotronComponent } from '../../../layout/section/jumbotron/jumbotron.component';
import { ShowcaseComponent } from '../../../layout/section/showcase/showcase.component';
import { FooterComponent } from '../../../layout/section/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    JumbotronComponent, 
    ShowcaseComponent, 
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {

}
