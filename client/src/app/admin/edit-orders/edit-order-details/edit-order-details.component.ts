import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { CarReturnedValues, IReturned } from 'src/app/shared/models/checkReturned';
import { IOrder, IOrderItem } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-edit-order-details',
  templateUrl: './edit-order-details.component.html',
  styleUrls: ['./edit-order-details.component.scss']
})
export class EditOrderDetailsComponent implements OnInit {
  @Input() orders: IOrder;
  @Input() ordersForAdmin: IOrder[];
  @Input() orderItems: IOrderItem;
  
  id: any;
  availableMessage: string;
  returned: boolean = false;
  available: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private breadcrumbService: BreadcrumbService,
    private adminService: AdminService) {
      this.breadcrumbService.set('@OrderDetailed', '');
     }
     
  ngOnInit(): void {
    this.adminService.getOrderDetailedForAdmin(+ this.route.snapshot.paramMap.get('id'))
    .subscribe((order: IOrder) => {
      this.orders = order;
      this.breadcrumbService.set('@OrderDetailed', `Order# ${order.id} - ${order.status}`);
    }, error => {
      console.log(error);
    }); 
  }

  orderDetails(){
      this.router.navigateByUrl('admin/orders');
  }

  onCheckCarReturned(event){
  this.route.paramMap.subscribe(queryParam => {
    this.id = queryParam.get('id')
  });
  this.adminService.getOrderDetailedForAdmin(this.id)
  .subscribe((orderItem: IOrderItem) => {
    this.orderItems = orderItem;
    const check = event.target.checked;
    debugger;
    if(check === true) {
      const value : boolean = true;
      this.returned = value;
      this.available = value;
      this.adminService.checkCarReturned(this.id, this.returned).subscribe(()=> {
        window.location.reload();
      })
    }
    else{
      const value : boolean = true;
      this.returned = value;
      this.available = value;
      this.adminService.checkCarReturned(this.id, this.returned).subscribe(() => {
        window.location.reload();
      })
    }
  })
}

}


   

