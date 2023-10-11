import { environment } from "src/environments/environment";

export class OPENAI_CHATGPT {
    public static get CHATGPT_COMPLETION(): string {
        return environment.url + 'openaiChatGPT/generateCompletions';
    }

    public static get CHATGPT_CHAT_COMPLETION(): string {
        return environment.url + 'openaiChatGPT/generateChatCompletions';
    }
}