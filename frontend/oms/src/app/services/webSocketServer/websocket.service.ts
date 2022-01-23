import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';
import { ToastrService } from "ngx-toastr";
import { LokalstorageService } from '../localstorageService/lokalstorage.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket:any;

  sendMessage(){
    this.socket.emit('message','Hello World');
  }

  sendName(){
    this.socket.emit('username',this.lokalStorage.getUserId());
  }

  statusToast(){
    console.log("bin im status toast")
    this.toastr.success("Status Changed","ABGESCHLOSSEN");
  }

  productToast(isCreated: Boolean){
    console.log("Bin Im Toast");
    if(isCreated) {
      this.toastr.success("New Product in Store!", "ProductService");
      console.log("afterToast");
    }
    
  }

 

  constructor(private toastr: ToastrService,
              private lokalStorage: LokalstorageService) { 
    this.socket = io('http://localhost:7000');
  }
}

