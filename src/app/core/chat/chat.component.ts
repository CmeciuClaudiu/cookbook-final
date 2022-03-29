import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MessageDto } from 'src/app/models/chat-models';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  constructor(private chatService: ChatService,
              private authService:AuthService) {
                this.msgDto.username=authService.sharedUserDetails$.userName;
              }

  ngOnInit(): void {
    this.chatService.retrieveMappedObject().subscribe( (receivedObj: MessageDto) => { this.addToInbox(receivedObj);});
  }

  msgDto: MessageDto = {} as MessageDto;

  @Input()
  msgInboxArray: MessageDto[] = [];

  send(): void {
    if(this.msgDto.message) {
        let dateTime = new Date();
        this.msgDto.dateTime=dateTime;
        this.chatService.broadcastMessage(this.msgDto);
        this.msgDto.message="";              
      }
    }

  addToInbox(obj: MessageDto) {
    let newObj = {} as MessageDto;
    newObj.username = obj.username;
    newObj.message = obj.message;
    newObj.dateTime=obj.dateTime;
    this.msgInboxArray.unshift(newObj);
  }
}
