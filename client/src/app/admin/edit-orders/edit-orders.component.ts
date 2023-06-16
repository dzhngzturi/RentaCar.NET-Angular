import { Component, Input, OnInit } from '@angular/core';
import { IOrder, IOrderItem } from 'src/app/shared/models/order';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-orders',
  templateUrl: './edit-orders.component.html',
  styleUrls: ['./edit-orders.component.scss']
})
export class EditOrdersComponent implements OnInit {
  @Input() orders: IOrder[];
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getOrdersForAdmin();
  }

  getOrdersForAdmin(){
    this.adminService.getOrdersForAdmin().subscribe((order: IOrder[]) => {
      this.orders = order;
    }, error => {
      console.log(error);
    });
  }
  

}
