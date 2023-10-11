import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OpenaiChatGPTService } from 'src/app/shared/services/openai-chat-gpt.service';
import { Message } from '../../model/chatbot.model';
import { NotificationService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-chatbot-dialog',
  templateUrl: './chatbot-dialog.component.html',
  styleUrls: ['./chatbot-dialog.component.css']
})
export class ChatbotDialogComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollBottom', { static: true }) private scrollContainer!: ElementRef;
  messageList!: Message[];
  message!: string;
  isLoading!: boolean;

  constructor(private openaiChatGPTService: OpenaiChatGPTService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.messageList = [];
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  // scroll to bottom
  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }

  // send text message
  public sendMessage(message: string) {
    if (message.length != 0) {
      this.messageList.push({
        text: message,
        isOwner: true
      });
      this.message = '';
      // this.generateOpenaiCompletion(message);
      this.generateOpenaiChatCompletion(message);
    }
  }

  // NOTE: Previously we're using this below text completion but now we're using chat completion 
  // to generate openai chatGPT completion(response)
  // public generateOpenaiCompletion(text: string) {
  //   setTimeout(() => {
  //     this.isLoading = true;
  //   }, 100);
  //   this.openaiChatGPTService.generateCompletion(text).subscribe((res: { result: string }) => {
  //     if (res) {
  //       this.messageList.push({
  //         // remove "\n" from the beggining of string & replace "\n" with <br> to start with new line
  //         text: res.result.slice(0, 2) == "\n\n" ? res.result.slice(2).replace(/\n/g, "<br>") : res.result.replace(/\n/g, "<br>"),
  //         isOwner: false
  //       });
  //       this.isLoading = false;
  //     }
  //   }, (err) => {
  //     console.log(err);
  //     this.isLoading = false;
  //   });
  // }

  // to generate openai chatGPT chat completion(response)
  public generateOpenaiChatCompletion(text: string) {
    setTimeout(() => {
      this.isLoading = true;
    }, 100);
    this.openaiChatGPTService.generateChatCompletion(text).subscribe((res: { result: { role: string, content: string } }) => {
      if (res) {
        this.messageList.push({
          text: res.result.content.replace(/\n/g, "<br>"),
          isOwner: false
        });
        this.isLoading = false;
      }
    }, (err) => {
      console.log(err);
      this.notificationService.showToast(err.error.errors[0].message, 'error');
      this.isLoading = false;
    });
  }

}
