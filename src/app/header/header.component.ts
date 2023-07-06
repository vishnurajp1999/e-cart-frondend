import { Component, OnInit } from '@angular/core';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private api:ApiService){}
  //to hold search term
  searchTerm: String=""

  ///to hold cart item count
  cartItemCount: number = 0

  ngOnInit(): void {
      this.api.getCartItemCount.subscribe((data:any)=>{
        console.log(data);//length of the cart array
        this.cartItemCount=data

      })
  }
  search(event:any){
    console.log(event.target.value);///search value
    //to assign new value to behaviour subject to use next() method
    this.api.searchTerm.next(event.target.value)///add search term to behaviour subject


  }

}
