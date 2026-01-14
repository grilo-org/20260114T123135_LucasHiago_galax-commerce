import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { RequestsService } from '../../../services/requests.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [CommonModule, HttpClientModule, SharedModule],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss'
})
export class ShowcaseComponent {

  allItems: any;

  constructor (private _request: RequestsService) {}

  getBothItems() {
    this._request.getData('both').subscribe({
      next: items => this.allItems = items,
      error: err => console.log(err)
    });
  }

  ngAfterViewInit(): void {
    this.getBothItems();
  }
}
