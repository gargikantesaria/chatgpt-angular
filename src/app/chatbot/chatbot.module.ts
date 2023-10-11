import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotDialogComponent } from './components/chatbot-dialog/chatbot-dialog.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ChatbotDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    ChatbotDialogComponent
  ]
})
export class ChatbotModule { }
