import { MessageDetails } from './messagedetails.model';

export class MessageDTO {
    lastKey: object;
    messages: MessageDetails[];

    constructor(lastKey: object, messages: MessageDetails[]) {
        this.lastKey = lastKey;
        this.messages = messages;
    }
}