export class MessageDetails {
    name: string;
    date: Date;
    content: string;

    constructor(name: string, date: Date, content: string) {
        this.name = name;
        this.date = date;
        this.content = content;
    }
}