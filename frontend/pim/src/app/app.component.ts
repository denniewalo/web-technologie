import { ProviderAst } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { WebSocketServiceService } from './services/WebSocketService/web-socket-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WebSocketServiceService]
})
export class AppComponent implements OnInit {
  title = 'pim';

  constructor(private websocketServiceService: WebSocketServiceService){}

  public ngOnInit() {
    this.websocketServiceService.sendMessage();
    this.websocketServiceService.socket.on('createProdukt',()=>{
      this.websocketServiceService.productToast();
    })
  }
}


