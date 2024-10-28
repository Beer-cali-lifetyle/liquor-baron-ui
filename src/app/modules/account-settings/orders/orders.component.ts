import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { ContextService } from '../../../core/services/context.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  standalone: true,
  imports: [
    CommonModule, RouterModule
  ]
})
export class OrdersComponent implements OnInit {
  orders: any = [];
  constructor(
    private ApiService: ApiService,
    private contextService: ContextService
  ) { }

  async ngOnInit() {
    await this.fetchOrders();
  }

  async fetchOrders() {
    this.orders = [];
    await this.ApiService.fetchOrders(this.contextService.user()?.id).then((res) => {
      this.orders = res
    })
  }

}
