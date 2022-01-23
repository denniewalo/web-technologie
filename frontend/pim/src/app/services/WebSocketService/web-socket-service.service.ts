import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';
import { Observable } from 'rxjs';
import { ToastrService } from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceService {

  socket:any;

  sendMessage(){
    this.socket.emit('message','Hello World');
  }

  sendStatusChange(UserId: String){
    console.log("Hier ist die User ID" + UserId);
    this.socket.emit("StatusChange",UserId);
  }

  productToast(isCreated: Boolean){
    console.log("Bin Im Toast");
    if(isCreated) {
      this.toastr.success("Product created!", "ProductService");
    }
    
  }

 

  constructor(private toastr: ToastrService) { 
    this.socket = io('http://localhost:7000');
  }
}
