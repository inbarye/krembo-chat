interface Message {
    text: string;
    sender: 'user' | 'bot';
}

interface BotResponse extends Message {
    text: string;
    sender: 'bot';
    rate: number;
    feedback: string;    
}