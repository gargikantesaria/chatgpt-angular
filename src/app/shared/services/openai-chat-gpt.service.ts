import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OPENAI_CHATGPT } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class OpenaiChatGPTService {

  constructor(private httpClient: HttpClient) { }

  generateCompletion(text: string) {
    return this.httpClient.post<{ result: string }>(OPENAI_CHATGPT.CHATGPT_COMPLETION, { text_message: text });
  }

  generateChatCompletion(text: string) {
    return this.httpClient.post<{ result: { role: string, content: string } }>(OPENAI_CHATGPT.CHATGPT_CHAT_COMPLETION, { text_message: text });
  }

}
