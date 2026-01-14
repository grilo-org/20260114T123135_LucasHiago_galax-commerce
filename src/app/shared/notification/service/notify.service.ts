import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class NotifyService {
    //SIMPLE NOTIFICATION
    setNewNotification(message:string, propClass:string){

      //EXECUTE IF MESSAGE HAS STRING
      if(message.length < 0) return;
  
      //CREATE ELEMENTS NOTIFICATION AND PROGRESSBAR
      let uniqueNotification = document.createElement('div');
      let progressBar = document.createElement('progress');
      //GET DOM CONTROLLER NOTIFICATIONS
      let notificationsController = document.querySelector('.notifications-controller');
  
      //CHECK IF EXISTS PROP 
      propClass.length > 0 ? uniqueNotification.setAttribute('class', `notification ${propClass}`) : uniqueNotification.setAttribute('class', 'notification');
  
      //SET MAX AND VALUE IN PROGRESS BAR WITH ASSIGN
      Object.assign(progressBar, {
        max: 100,
        value: 100
      });
  
      //INSERT MESSAGE INSIDE NOTIFICATION
      uniqueNotification.innerHTML = ` <p> ${message}  </p> `;
      //PUT PROGRESSBAR INSIDE NOTIFICATION
      uniqueNotification.append(progressBar);
      //INSERT NOTIFICATION INSIDE CONTROLLER
      notificationsController?.append(uniqueNotification);
      //HIDE NOTIFICATION IF PROGRESS HAS ZERO
      let clearProgressBar = setInterval(() => {
        //DECREMENT PROGRESSBAR VALUE
        progressBar.value = progressBar.value - 1;
        if(progressBar.value == 0) {
          //STOP INTERVAL
          clearInterval(clearProgressBar);
          //HIDE NOTIFICATION
          uniqueNotification.classList.add('hided');
          //IN ONE SECOND CLEAR HTML
          setTimeout(() => {
            uniqueNotification.remove();
          }, 1000);
        }
      }, 25);
  
    }
}
