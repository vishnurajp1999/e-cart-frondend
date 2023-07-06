import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  proceedtopay:boolean=false;
  //from paypal
  public payPalConfig?: IPayPalConfig;
  //paypal showcase
  showSuccess:boolean=false;

  discountStatus:boolean=false;
  offerClick:boolean=false;
username:any
housenumber:any
pincode:any
phone:any
  //to hold payment status
paymentstatus:boolean = false;
//to hold total price
  totalprice: number=0
//to hold the array cart item
  allCart:any=[]
  constructor(private api:ApiService, private fb:FormBuilder){}
//address form
addressform=this.fb.group({
  //array
  username:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
  housenumber:['',[Validators.required,Validators.pattern('[0-9]*')]],
  street:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
  state:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
  pincode:['',[Validators.required,Validators.pattern('[0-9]*')]],
  mobilenumber:['',[Validators.required,Validators.pattern('[0-9]*')]]
})
  ngOnInit():void{
    //pay pal func call
    this.initConfig();

  this.api.getCart().subscribe((result:any)=>{
console.log(result);
this.allCart=result
//call cart total
this.getCartTotal()
  },
  (result:any)=>{
    console.log(result.error);

  })
}
removeCartItem(id:any){
  this.api.removeCartItem(id).subscribe((result:any)=>{
    console.log(result);
    //remaining cart items added to the allcarts
    this.allCart=result
    this.api.cartCount()
    this.getCartTotal()

  },
  (result:any)=>{
    console.log(result.error);///error message

  })
}
//getcart total
getCartTotal(){
  let total =0;
  this.allCart.forEach((item:any)=>{
    total=total+item.grandTotal
    this.totalprice=Math.ceil(total)
  })
}

//increment cart
incrementCart(id:any){
  this.api.incrementCartCount(id).subscribe((result:any)=>{
    this.allCart=result
    this.getCartTotal()
  },
  (result:any)=>{
    alert(result.error)
  })

}

//decrement cart
decrementcart(id:any){
  this.api.decrementcartCount(id).subscribe((result:any)=>{
    this.allCart=result
    this.getCartTotal()
  },
  (result:any)=>{
    alert(result.error)
  })

}

submitForm(){
  //check addres is valid
  if (this.addressform.valid){
this.paymentstatus=true
this.username=this.addressform.value.username
this.housenumber=this.addressform.value.username
this.pincode=this.addressform.value.pincode
this.phone=this.addressform.value.mobilenumber
  }
  else{
    alert("Please enter Valid Details")
  }
}
offerClicked(){
this.offerClick=true


}
discount(value:any){
  this.totalprice=Math.ceil (this.totalprice*(100-value)/100)
  this.offerClick=false
  this.discountStatus=true
}

makepay(){
  this.proceedtopay=true
}
modalclose(){
  this.addressform.reset()
  this.showSuccess=false
  this.paymentstatus=false
  
}
//paypal function

private initConfig(): void {
  this.payPalConfig = {
  currency: 'EUR',
  clientId: 'sb',
  createOrderOnClient: (data) => <ICreateOrderRequest>{
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'EUR',
          value: '9.99',
          breakdown: {
            item_total: {
              currency_code: 'EUR',
              value: '9.99'
            }
          }
        },
        items: [
          {
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: '9.99',
            },
          }
        ]
      }
    ]
  },
  advanced: {
    commit: 'true'
  },
  style: {
    label: 'paypal',
    layout: 'vertical'
  },
  onApprove: (data, actions) => {
    console.log('onApprove - transaction was approved, but not authorized', data, actions);
    actions.order.get().then((details:any) => {
      console.log('onApprove - you can get full order details inside onApprove: ', details);
    });
  },
  onClientAuthorization: (data) => {
    console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
    this.showSuccess = true;
  },
  onCancel: (data, actions) => {
    console.log('OnCancel', data, actions);
  },
  onError: err => {
    console.log('OnError', err);
  },
  onClick: (data, actions) => {
    console.log('onClick', data, actions);
  },
};
}
}
