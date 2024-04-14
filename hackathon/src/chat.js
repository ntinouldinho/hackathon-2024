import React, { useState } from 'react';
import axios from 'axios';
import './Chat.css'; // Ensure the CSS file is properly linked

export const Chat = ({ planet }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        if (!message) return;

        try {
            const send = {
                "question": message,
                "planet": planet
            };
            const response = await axios.post('http://localhost:5000/api/chat', send);
            console.log('Message sent:', response.data);

            // Update state with user message and response
            setMessages(prevMessages => [
                ...prevMessages, 
                { text: message, sender: 'user' },
                { text: response.data["generated_text"], sender: 'response' }
            ]);
            setMessage('');
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                   (msg.text && <p key={index} className={msg.sender === 'user' ? 'message-user' : 'message-response'}>
                        {msg.text}
                    </p>)
                ))}
            </div>
            <div className="input-group">
                <input 
                    type="text" 
                    value={message} 
                    onChange={e => setMessage(e.target.value)} 
                    onKeyDown={handleKeyDown}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};
