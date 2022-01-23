import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/webSocketServer/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WebsocketService]
})
export class AppComponent implements OnInit {
  title = 'oms';

  constructor(private websocketServiceService: WebsocketService){}

  public ngOnInit(){
    this.websocketServiceService.sendMessage();
    this.websocketServiceService.socket.on('ProduktToast',(data: any)=>{
      this.websocketServiceService.productToast(true);
    })
  }
}
