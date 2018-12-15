import { Component, OnChanges, ViewChildren, Input } from '@angular/core';
import * as io from 'socket.io-client';
import { Constants } from '../../common/constants';
import { Global } from '../../common/global';

@Component({
  selector: 'app-chat-forum',
  templateUrl: './chat-forum.component.html'
})
export class ChatForumComponent implements OnChanges {


  @Input() courseId: string = '';
  @Input() courseDetails = [];

  public chatData = [];
  public chatMessage = '';
  public messageIndex: any;
  public replayUserName: boolean = false;
  public socket: any;
  public chatSet = {};
  public user: any;
  public username: any;
  public infoMessage: boolean = true;
  public errorMessage: boolean = false;
  public successMessage: boolean = false;
  public message: any;
  public chatObj = {
      chatMessage: '',
      createdOn: new Date()
  };
  @ViewChildren('textarea') vc;
  constructor(public global: Global,) { }

  ngOnChanges() {
    if (this.courseId && this.courseId !== '') {
      this.user = this.global.getStorageDetail('user');
      this.connectServer();
    }
  }

  connectServer() {
    this.socket = io.connect(Constants.APIPATH);
      this.socket.emit('sendCourseId', this.courseId);
      this.socket.on('chatHistory', (response) => {
          if(response.result){
              this.chatData = response.data;
              setTimeout(() => {
                  const messageBody = document.querySelector('#messageBody');
                  messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
              }, 100);
          }
      });
  }

  sendUserMessage() {
    this.replayUserName = false;
    let emailMatched: boolean = false;
    if (this.user) {
        if (this.courseDetails[0].enrolledUser.length > 0) {
            this.courseDetails[0].enrolledUser.filter((data) => {
                if (data.userEmailId === this.user.data.emailId) {
                    emailMatched = true;
                }
            });
            if (emailMatched) {
                this.chatObj.chatMessage = this.chatMessage;
                if (this.messageIndex || this.messageIndex === 0) {
                    this.chatSet = {
                        position: this.messageIndex,
                        userName: this.user.data.userName,
                        userId: this.user.data._id,
                        replyMessage: this.chatMessage,
                        createdOn: this.todayDate()
                    };
                    this.messageIndex = undefined;
                } else {
                    this.chatSet = {
                        position: this.messageIndex,
                        userName: this.user.data.userName,
                        userId: this.user.data._id,
                        chatMessage: this.chatMessage,
                        createdOn: this.todayDate(),
                        replyMessage: []
                    };
                }
                
                const discussionForumsDetails = {
                    courseId: this.courseDetails[0]._id,
                    discussionData: this.chatSet
                };
                console.log(discussionForumsDetails);
                this.socket.emit('storeChatMessage', discussionForumsDetails);
            } else {
                this.infoMessage = false;
                this.errorMessage = true;
                this.message = 'Only Enrolled User Can Participate In this Discussion';
            }
        } else {
            this.infoMessage = false;
            this.errorMessage = true;
            this.message = 'Only Enrolled User Can Participate In this Discussion';
        }
    }
}

chatReplyLink(id,name) {
    this.replayUserName = true;
    this.messageIndex = id;
    this.username = name;
    this.vc.first.nativeElement.focus();
}

todayDate() {
  return new Date();
}


}
