import React, { useState, useRef } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { strings } from '@/helpers/strings';
import Feedback from './Feedback';
import {
    Box,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
    Input,
    Grid
} from '@mui/material';

const ChatBot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSend = () => {
        // TODO: send to API
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            // Simulate bot response
            setTimeout(() => {
                setMessages(prev => [...prev, { text: `You said: ${input}`, sender: 'bot' }]);
            }, 1000);
            setInput('');
        }

    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // TODO: send the file to server
            setMessages(prev => [...prev, { text: `Uploaded file: ${file.name}`, sender: 'user' }]);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h5" gutterBottom align='right'>
                    {strings.chatTitle}
                </Typography>
                <List sx={{ height: 300, overflow: 'auto' }}>
                    {messages.map((message, index) => (
                        <ListItem key={index} alignItems="flex-start">
                                <ListItemText
                                    primary={message.sender === 'user' ? 'You' : 'Bot'}
                                    secondary={message.text}
                                    sx={{
                                        textAlign: message.sender === 'user' ? 'right' : 'left',
                                    }}
                                />
                                {message.sender === 'bot' ? <Feedback/> : ""}
                        </ListItem>
                    ))}
                </List>
            </Paper >
            <Box sx={{ display: 'flex', mb: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                />
                <Button variant="outlined" onClick={() => fileInputRef.current?.click()}>
                    <AttachFileIcon />
                </Button>
                <Button variant="contained" onClick={handleSend} sx={{ ml: 1 }}>
                    <SendIcon />
                </Button>

            </Box>
            <Box sx={{ mb: 2 }}>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                />
            </Box>
        </Box >
    );
};

export default ChatBot;