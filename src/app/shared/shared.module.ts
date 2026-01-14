import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { UserActionsComponent } from './user-actions/user-actions.component';
import { CardListComponent } from './card-list/card-list.component';
import { CardComponent } from './card-list/card/card.component';
import { CartComponent } from './cart/cart.component';

import { NgIconsModule, provideNgIconsConfig } from '@ng-icons/core';
import { heroShoppingBagSolid, heroUserCircleSolid, heroXMarkSolid } from '@ng-icons/heroicons/solid';
import { HttpClientModule } from '@angular/common/http';
import { RequestsService } from '../services/requests.service';
import { DialogComponent } from './dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { NotificationComponent } from './notification/notification.component';

const components = [ HeaderComponent, UserActionsComponent, CardListComponent, CardComponent, CartComponent, DialogComponent, FormComponent,
NotificationComponent ];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgIconsModule.withIcons({ heroShoppingBagSolid, heroUserCircleSolid, heroXMarkSolid })
  ],
  providers: [
    provideNgIconsConfig({
      size: '1.5em',
      color: 'inherit',
    }),
    RequestsService
  ]
})

export class SharedModule { }
