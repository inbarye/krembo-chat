import React, { useState, useRef } from 'react';
import Feedback from './Feedback';
import { strings } from '../helpers/strings'
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Modal,
  ButtonGroup
} from '@mui/material';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<'approve' | 'reject' | null>(null);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: `${input}`, sender: 'bot' }]);
      }, 1000);
      setInput('');
    }
  };

  const handleActionClick = (action: 'approve' | 'reject') => {
    setModalAction(action);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalAction(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: send the file to server
      setMessages(prev => [...prev, { text: `צורף קובץ: ${file.name}`, sender: 'user' }]);
    }
  };

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', my: '2%' }}>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'right' }}>
          {strings.chatTitle}
        </Typography>
        <List sx={{ height: 300, overflow: 'auto' }}>
          {messages.map((message, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemText
                primary={message.sender === 'user' ? strings.message.sender.you : strings.message.sender.bot}
                secondary={
                  <>
                    <Typography component="span" variant="body2">
                      {message.text}
                    </Typography>
                    {message.sender === 'bot' && (
                      <Box size="small" sx={{ mt: 1, mx: 1 }}>
                        <Button color="success" onClick={() => handleActionClick('approve')}>{strings.approve}</Button>
                        <Button color="error" onClick={() => handleActionClick('reject')}>{strings.reject}</Button>
                      </Box>
                    )}
                  </>
                }
                sx={{
                  textAlign: message.sender === 'user' ? 'right' : 'left',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box sx={{ display: 'flex' }}>
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
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2">
            {modalAction === 'approve' ? 'דירוג הצלחה' : 'סיבת דחייה'}
          </Typography>
          <Feedback />
          <Button onClick={handleCloseModal} sx={{ mt: 2 }}>
            סגור
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ChatBot;