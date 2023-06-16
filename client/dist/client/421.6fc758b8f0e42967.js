"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[421],{1421:(T,p,d)=>{d.r(p),d.d(p,{OrdersModule:()=>s});var i=d(6895),e=d(1571),g=d(1330),c=d(9838);function m(o,t){if(1&o&&(e.TgZ(0,"tr",6)(1,"th"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.ALo(5,"date"),e.qZA(),e.TgZ(6,"td"),e._uU(7),e.ALo(8,"currency"),e.qZA(),e.TgZ(9,"td"),e._uU(10),e.qZA()()),2&o){const r=t.$implicit;e.MGl("routerLink","/orders/",r.id,""),e.xp6(2),e.hij("# ",r.id,""),e.xp6(2),e.Oqu(e.xi3(5,5,r.orderDate,"medium")),e.xp6(3),e.Oqu(e.lcZ(8,8,r.total)),e.xp6(3),e.Oqu(r.status)}}class a{constructor(t){this.ordersService=t}ngOnInit(){this.getOrders()}getOrders(){this.ordersService.getOrdersForUser().subscribe(t=>{this.orders=t},t=>{console.log(t)})}}a.\u0275fac=function(t){return new(t||a)(e.Y36(g.N))},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-orders"]],inputs:{orders:"orders"},decls:16,vars:1,consts:[[1,"container","mt-5"],[1,"row"],[1,"col-12"],[1,"table","table-hover",2,"cursor","pointer"],[1,"thead-light"],[3,"routerLink",4,"ngFor","ngForOf"],[3,"routerLink"]],template:function(t,r){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"table",3)(4,"thead",4)(5,"tr")(6,"th"),e._uU(7,"Order"),e.qZA(),e.TgZ(8,"th"),e._uU(9,"Date"),e.qZA(),e.TgZ(10,"th"),e._uU(11,"Total"),e.qZA(),e.TgZ(12,"th"),e._uU(13,"Status"),e.qZA()()(),e.TgZ(14,"tbody"),e.YNc(15,m,11,10,"tr",5),e.qZA()()()()()),2&t&&(e.xp6(15),e.Q6J("ngForOf",r.orders))},dependencies:[i.sg,c.rH,i.H9,i.uU]});var Z=d(8909);function O(o,t){if(1&o&&(e.TgZ(0,"tr",15)(1,"th",16)(2,"div",17),e._UZ(3,"img",18),e.TgZ(4,"div",19)(5,"h5",20)(6,"a",21),e._uU(7),e.qZA()()()()(),e.TgZ(8,"td",22)(9,"strong"),e._uU(10),e.ALo(11,"currency"),e.qZA()(),e.TgZ(12,"td",22)(13,"span",23),e._uU(14),e.qZA()()()),2&o){const r=t.$implicit;e.xp6(3),e.s9C("src",r.pictureUrl,e.LSH),e.s9C("alt",r.productName),e.xp6(3),e.MGl("routerLink","/car/",r.carId,""),e.xp6(1),e.hij("",r.carName," "),e.xp6(3),e.Oqu(e.lcZ(11,6,r.price)),e.xp6(4),e.Oqu(r.quantity)}}function h(o,t){if(1&o&&(e.TgZ(0,"ul",24)(1,"li",25)(2,"strong",26),e._uU(3,"Daily price:"),e.qZA(),e.TgZ(4,"strong",26),e._uU(5),e.ALo(6,"currency"),e.qZA()(),e.TgZ(7,"li",25)(8,"strong",26),e._uU(9,"Rented days:"),e.qZA(),e.TgZ(10,"strong",26),e._uU(11),e.qZA()(),e.TgZ(12,"li",25)(13,"strong",26),e._uU(14,"Order Total"),e.qZA(),e.TgZ(15,"strong",26),e._uU(16),e.ALo(17,"currency"),e.qZA()()()),2&o){const r=t.$implicit,u=e.oxw(2);e.xp6(5),e.Oqu(e.lcZ(6,3,r.price)),e.xp6(6),e.Oqu(r.days),e.xp6(5),e.Oqu(e.lcZ(17,5,u.orders.total))}}function v(o,t){if(1&o&&(e.TgZ(0,"div",2)(1,"div",3)(2,"div")(3,"div",4)(4,"table",5)(5,"thead",6)(6,"tr")(7,"th",7)(8,"div",8),e._uU(9,"Car"),e.qZA()(),e.TgZ(10,"th",7)(11,"div",9),e._uU(12,"Price"),e.qZA()(),e.TgZ(13,"th",7)(14,"div",9),e._uU(15,"Quantity"),e.qZA()()()(),e.TgZ(16,"tbody"),e.YNc(17,O,15,8,"tr",10),e.qZA()()()()(),e.TgZ(18,"div",11)(19,"div",12),e._uU(20,"Order Summary"),e.qZA(),e.TgZ(21,"div",13),e.YNc(22,h,18,7,"ul",14),e.qZA()()()),2&o){const r=e.oxw();e.xp6(17),e.Q6J("ngForOf",r.orders.orderItems),e.xp6(5),e.Q6J("ngForOf",r.orders.orderItems)}}class l{constructor(t,r,u){this.route=t,this.breadcrumbService=r,this.orderService=u,this.breadcrumbService.set("@OrderDetailed","")}ngOnInit(){this.orderService.getOrderDetailed(+this.route.snapshot.paramMap.get("id")).subscribe(t=>{this.orders=t,this.breadcrumbService.set("@OrderDetailed",`Order# ${t.id} - ${t.status}`)},t=>{console.log(t)})}}l.\u0275fac=function(t){return new(t||l)(e.Y36(c.gz),e.Y36(Z.pm),e.Y36(g.N))},l.\u0275cmp=e.Xpm({type:l,selectors:[["app-order-detailed"]],inputs:{orders:"orders"},decls:2,vars:1,consts:[[1,"container","mt-5"],["class","row",4,"ngIf"],[1,"row"],[1,"col-8"],[1,"table-responsive"],[1,"table","table-borderless"],[1,"border-0","py-0"],["scope","col"],[1,"p-2","px-3","text-uppercase"],[1,"py-2","text-uppercase"],["class","border-0",4,"ngFor","ngForOf"],[1,"col-4"],[1,"bg-light","px-4","py-3","text-uppercase","font-weight-bold"],[1,"p-4"],["class","list-unstyled mb-1",4,"ngFor","ngForOf"],[1,"border-0"],["scope","row"],[1,"p-0"],[1,"img-fluid",2,"max-height","50px",3,"src","alt"],[1,"ml-3","d-inline-block","align-middle"],[1,"mb-0"],["id","txtCarName",1,"text-uppercase",3,"routerLink"],[1,"align-middle"],[1,"font-weight-bold","px-5"],[1,"list-unstyled","mb-1"],[1,"d-flex","justify-content-between","py-3","border-bottom"],[1,"text-muted"]],template:function(t,r){1&t&&(e.TgZ(0,"div",0),e.YNc(1,v,23,2,"div",1),e.qZA()),2&t&&(e.xp6(1),e.Q6J("ngIf",r.orders))},dependencies:[i.sg,i.O5,c.rH,i.H9],styles:["#txtCarName[_ngcontent-%COMP%]{color:#000}#txtCarName[_ngcontent-%COMP%]:hover{delay:.01s;color:#00f}"]});const f=[{path:"",component:a},{path:":id",component:l,data:{breadcrumb:{alias:"OrderDetailed"}}}];class n{}n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[c.Bz.forChild(f),c.Bz]});var x=d(4466);class s{}s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[i.ez,n,x.m]})}}]);