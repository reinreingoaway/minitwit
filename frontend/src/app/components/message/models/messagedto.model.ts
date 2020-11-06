import { MessageDetails } from './messagedetails.model';

export class MessageDTO {
    lastEvaluatedKey: object;
    messages: MessageDetails[];

    constructor(lastEvaluatedKey: object, messages: MessageDetails[]) {
        this.lastEvaluatedKey = lastEvaluatedKey;
        this.messages = messages;
    }
}