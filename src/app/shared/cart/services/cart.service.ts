import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionService } from '../../../services/session/session.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartVisible = new BehaviorSubject<boolean>(false);
  cartVisible$ = this.cartVisible.asObservable();

  private itemsCart = new BehaviorSubject<any[]>(this.loadInitialData());
  itemsCart$ = this.itemsCart.asObservable();

  private totalAmount = new BehaviorSubject<number>(0);
  totalAmount$ = this.totalAmount.asObservable();

  private itemType: any = {
    product: 'product_id',
    service: 'service_id',
    combo: 'combo_id'
  }

  private sessionId: string;

  constructor(private _session: SessionService) {
    this.sessionId = this._session.createSessionId();
    this._session.loadSessionData(this.itemsCart, this.sessionId);
  }

  private loadInitialData() {
    return this._session.loadInitialData(this.sessionId);
  }

  private isDuplicated(newItem: any, items: any[]): boolean {
    const itemField = this.itemType[newItem.type];
    const itemId = newItem[itemField];
    return items.some(item => item[itemField] === itemId);
  }

  addItem(item: any): void {
    const currentItems = this.itemsCart.value;
    if(this.isDuplicated(item, currentItems)) return;
      this.itemsCart.next([...currentItems, item]);
      this._session.saveSessionData(this.itemsCart, this.sessionId);
  }

  removeItem(item: any): void {
    const currentItems = this.itemsCart.value;
    this.itemsCart.next(currentItems.filter(_item => _item !== item));
    this._session.saveSessionData(this.itemsCart, this.sessionId);
  }

  getTotalAmount() {
    if(this.itemsCart.value.length == 0) return;
    let value = this.itemsCart.value
    .map((item: { price: any; }) => Number(item.price))
    .reduce((acc: any, value: any) => acc + value)
    this.totalAmount.next(
      Number(value.toFixed(2))
    );
  }

  toggleCarVisibility(boolean: boolean = false) {
    this.cartVisible.next(boolean == true ? boolean : !this.cartVisible.value);
  }
}
