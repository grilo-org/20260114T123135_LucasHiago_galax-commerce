import { Component, ComponentRef, Input, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { DialService } from './sevice/dial.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})

export class DialogComponent {
  @Input() Content!: Type<any>;
  @Input() Title: String = '';
  @ViewChild('dialogContent', { read: ViewContainerRef }) dialogContent!: ViewContainerRef;
  Ref?: ComponentRef<any>;
  isOpen: boolean = false;

  constructor(private _dial: DialService){
    this._dial.isOpen$.subscribe(isOpened => this.isOpen = isOpened);
  }

  loadComponent(Content: any) {
    if(!Content) return;
    this.destroyRef();
    this.Ref = this.dialogContent.createComponent(Content);
  }

  toggleDialog() {
    this._dial.toggleDialogVisibility();
  }
  
  destroyRef() {
    if(this.Ref) {
      this.Ref.destroy();
      return false;
    }
    return true;
  }

  ngOnDestroy() {
    this.destroyRef();
  }
}
