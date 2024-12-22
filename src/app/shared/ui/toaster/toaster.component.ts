import { Component, OnInit, TemplateRef } from '@angular/core';
import { UiToasterService } from '../../../core/services/toaster.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { MiniCartComponent } from "../../../modules/shopping-cart/mini-cart/mini-cart.component";

@Component({
  selector: 'app-toaster',
  styleUrls: ['./toaster.component.scss',],
  template: `
    <ngb-toast
    *ngFor="let toast of UiToasterService.toasts"
    [class]="toast.classname"
    [autohide]="true"
    [delay]="toast.delay || 5000"
    (hidden)="UiToasterService.Remove(toast)"
    >
    <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
  <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
</ng-template>

<ng-template #text>
  <span *ngIf="!toast?.cart">
<h1>No hit</h1>
  <ngb-toast-header ngbToastHeader style="background-color: yellow; color: black;">
    <div style="display: flex; align-items: center;">
      <img src="assets/images/logo-light.png" alt="" class="me-2" height="28">
      <small style="margin-left: auto; color: black;">just now</small>
    </div>
  </ngb-toast-header>
  <div class="message-container" style="background-color: yellow; padding: 10px;">
    <span [ngClass]="toast.iconClass" style="margin-left: 10px; margin-right: 10px; color: black; margin-top:10px;"></span>
    <span style="color: black;">{{ toast.textOrTpl }}</span>
  </div>
</span>
<span *ngIf="toast?.cart">
<app-mini-cart></app-mini-cart>
</span>

</ng-template>

    `,
  standalone: true,
  imports: [NgbToastModule, CommonModule, MiniCartComponent],
  host: { 'class': 'toast-container position-fixed top-0 end-0 p-3' }
})

export class ToasterComponent {

  isTemplate(toast: { textOrTpl: any; }) { return toast.textOrTpl instanceof TemplateRef; }

  constructor(public UiToasterService: UiToasterService) { }

}