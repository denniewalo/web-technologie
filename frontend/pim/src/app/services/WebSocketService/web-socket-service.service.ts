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

  productToast(){
    this.toastr.success("Product created!", "ProductService");
  }

 

  constructor(private toastr: ToastrService) { 
    this.socket = io('http://localhost:7000');
  }
}
