import { Injectable } from '@angular/core';
import { v4 as uuidv4 }  from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  public createSessionId(): string {
    //return uuidv4();
    return `userCartBuyAction`;
  }

  public loadInitialData(sessionId: string): any[] {
    const sessionData = sessionStorage.getItem(sessionId);
    return sessionData ? JSON.parse(sessionData) : [];
  }

  public loadSessionData(items: any, sessionId: string) {
    const sessionData = sessionStorage.getItem(sessionId);
    if(sessionData) {
      return items.next(JSON.parse(sessionData));
    }
  }

  public saveSessionData(items: any, sessionId: string) {
    sessionStorage.setItem(sessionId, JSON.stringify(items.value));
  }

  public clearSession(sessionId: string): void {
    sessionStorage.removeItem(sessionId);
  }

  public createSessionUuid() {
    return uuidv4();
  }
}
