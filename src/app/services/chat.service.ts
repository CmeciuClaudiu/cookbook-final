import { Injectable, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';         
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { MessageDto } from '../models/chat-models';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private  connection: any = new signalR.HubConnectionBuilder().withUrl("http://cookbook.ddns.net:5000/chatsocket")   // mapping to the chathub as in startup.cs
                                         .configureLogging(signalR.LogLevel.Information)
                                         .build();
  readonly POST_URL = "http://cookbook.ddns.net:5000/api/chat/send"

  private receivedMessageObject: MessageDto = {} as MessageDto;
  private sharedObj = new Subject<MessageDto>();

  constructor(private http: HttpClient) { 
    this.connection.onclose(async () => {
      await this.start();
    });
   this.connection.on("ReceiveOne", (username: string, message: string, dateTime: Date) => { this.mapReceivedMessage(username, message, dateTime); });
   this.start();                 
  }

  public async start() {
    try {
      await this.connection.start();
      console.log("connected");
    } catch (err) {
      console.log(err);
      setTimeout(() => this.start(), 5000);
    } 
  }

  private mapReceivedMessage(user: string, message: string, dateTime: Date): void {
    this.receivedMessageObject.username = user;
    this.receivedMessageObject.message = message;
    this.receivedMessageObject.dateTime=dateTime;
    this.sharedObj.next(this.receivedMessageObject);
 }

  public broadcastMessage(msgDto: any) {
    this.http.post(this.POST_URL, msgDto).subscribe(data => console.log(data));
  }

  public retrieveMappedObject(): Observable<MessageDto> {
    return this.sharedObj.asObservable();
  }

  getMessageHistory(){
    return this.http.get<MessageDto[]>('http://cookbook.ddns.net:5000/api/chat/getMessagesHistory')
  }
}
