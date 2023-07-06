import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewProductComponent  implements OnInit{
  product:any=[];
  constructor( private viewRoute:ActivatedRoute,private api:ApiService){}
  productId:any='';
  ngOnInit(): void {

    //to fetch parameter details
    this.viewRoute.params.subscribe((result:any)=>{
      console.log(result.productId);
      this.productId=result.productId
      //to fetch particular product details
      this.api.viewProduct(this.productId).subscribe((result:any)=>{
        console.log(result);
        this.product=result//product details

      },(result:any)=>{
        console.log(result.error);

      }
      )
    })
  }

  ///api function add to wishlist
  addtowishlist(){
    const {id,title,price,image}=this.product

  //api function
  this.api.addToWishlist(id,title,price,image).subscribe((result:any)=>{
    alert(result);
  },

  (result:any)=>{
    alert(result.error);///error msg
  }
  )



  }

  addToCart(product:any){
    console.log(product);

    //add to quantity to cart
    Object.assign(product,{quantity:1})
    console.log(product);

//api call to  add  quantity
this.api.addToCart(product).subscribe((result:any)=>{
  //call cart count
  this.api.cartCount()
  alert(result)// added to cart
},
(result:any)=>{
  alert(result.error)//error message
})

}

//cart increment


}

