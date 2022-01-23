import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket:any;

  sendMessage(){
    this.socket.emit('message','Hello World');
  }

  productToast(isCreated: Boolean){
    console.log("Bin Im Toast");
    if(isCreated) {
      this.toastr.success("New Product in Store!", "ProductService");
      console.log("afterToast");
    }
    
  }

 

  constructor(private toastr: ToastrService) { 
    this.socket = io('http://localhost:7000');
  }
}

