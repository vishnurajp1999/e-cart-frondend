import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //to hold cart count

  getCartItemCount  = new BehaviorSubject(0)//initial value

//to hold search term
  searchTerm= new BehaviorSubject('')


  //backend url
  BASE_URL='http://localhost:5000'
  decrementCartCount: any;

  constructor(private http:HttpClient) {

    this.cartCount()
   }
  //get all products
  getAllProducts(){
  return this.http.get(`${this.BASE_URL}/products/all-products`)
}

//view particula products
viewProduct(id:any){
return this.http.get(`${this.BASE_URL}/products/viewproduct/${id}`)

}

///add wishlist product
addToWishlist(id:any,title:string,price:any,image:string){
  const body={
    id,
    title,
    price,
    image
  }
  return this.http.post(`${this.BASE_URL}/products/addtowishlist`,body)
}
//getwishlist product
getWishlist(){
  return this.http.get(`${this.BASE_URL}/products/getwishlist`)
}

deleteWishlist(id:any){
  return this.http.delete(`${this.BASE_URL}/products/deletewishlist/${id}`)
}

//add to cart
addToCart(product:any){
  const body ={
    id:product.id,
    title:product.title,
    price:product.price,
    image:product.image,
    quantity:product.quantity
  }
  return this.http.post(`${this.BASE_URL}/products/addtocart`,body)
}
//get cart
getCart(){
  return this.http.get(`${this.BASE_URL}/products/getcart`)
}
//cart count
cartCount(){
  this.getCart().subscribe((result:any)=>{///cart array
    this.getCartItemCount.next(result.length);///cart count = length of cart array

  })

}

//delete cart item
removeCartItem(id:any){
  return this.http.delete(`${this.BASE_URL}/products/deletecart/${id}`)
}

//increment cart count
incrementCartCount(id:any){
  return this.http.get(`${this.BASE_URL}/products/increment/${id}`)
}


//decrement cart count

decrementcartCount(id:any){
  return this.http.get(`${this.BASE_URL}/products/decrement/${id}`)
}


}
