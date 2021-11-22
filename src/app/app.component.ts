import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessageDto } from './models/chat-models';
import { AuthService } from './services/auth.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cookbook';
  chatIsOpened :boolean =false;

  destroy$: Subject<boolean> = new Subject<boolean>();
  msgInboxArray: MessageDto[] = [];

  constructor(private chatService : ChatService,
              private authService: AuthService){

  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onLoggedInUserCheck():boolean{
    if (!this.authService.sharedUserDetails$.userName){
      this.chatIsOpened=false;
      return false;
    }
    else
      return true;
  }

  openChat() :boolean{
    this.chatIsOpened=!this.chatIsOpened;

    if (this.chatIsOpened){
        this.chatService.getMessageHistory().pipe(takeUntil(this.destroy$))
                                            .subscribe(result => {
                                                this.msgInboxArray=result;
                                            });
    }

    return this.chatIsOpened;
  }
}
