import React, { useState, useRef } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { strings } from '@/helpers/strings';
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

const Feedback: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFeedbackSubmit = () => {
        if (rating !== null || feedback.trim()) {
            console.log(`Feedback submitted - Rating: ${rating}, Comment: ${feedback}`);
            // TODO: send this feedback to your server
            setRating(null);
            setFeedback('');
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
                {/* <Typography variant="h6" gutterBottom>
                    Feedback
                </Typography> */}
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Typography component="legend">דירוג:</Typography>
                    </Grid>
                    <Grid item>
                        <Rating
                            dir="rtl"
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
                    placeholder="הסבר את בחירתך"
                    sx={{ mt: 2, mb: 2 }}
                />
                <Button variant="contained" onClick={handleFeedbackSubmit}>
                    שליחה
                </Button>
            </Paper>
        </Box>
    );
};

export default Feedback;