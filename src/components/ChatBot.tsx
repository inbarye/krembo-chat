import React, { useState, useRef } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import {
    Box,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
    Rating,
    Input,
    Grid
} from '@mui/material';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

const strings = {
    chatTitle: "מנגיש פעולות",
    rate: {
        veryPoor: "גרוע",
        poor: "לא טוב",
        average: "ממוצע",
        good: "טוב",
        excellent: "מצויין",
    },
}

const ChatBot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSend = () => {
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
            // Here you would typically send the file to your server or process it
            setMessages(prev => [...prev, { text: `Uploaded file: ${file.name}`, sender: 'user' }]);
        }
    };

    const handleFeedbackSubmit = () => {
        if (rating !== null || feedback.trim()) {
            console.log(`Feedback submitted - Rating: ${rating}, Comment: ${feedback}`);
            // Here you would typically send this feedback to your server
            setRating(null);
            setFeedback('');
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
                        </ListItem>
                    ))}
                </List>
            </Paper>
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
            <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Feedback
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Typography component="legend">Rate:</Typography>
                    </Grid>
                    <Grid item>
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                        />
                    </Grid>
                </Grid>
                <TextField
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={2}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Your feedback..."
                    sx={{ mt: 2, mb: 2 }}
                />
                <Button variant="contained" onClick={handleFeedbackSubmit}>
                    Submit Feedback
                </Button>
            </Paper>
        </Box>
    );
};

export default ChatBot;