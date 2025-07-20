import React, { useState, useRef, useEffect } from 'react';
import './Feature.css';

const QuizGenerator = () => {
    const [input, setInput] = useState('');
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    const formatGeminiOutput = (text) => {
        let formatted = text
            .replace(/\n{2,}/g, '<br><br>')
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/(\d+\.) /g, '<span class="quiz-number">$1</span>')
            .replace(/Answer key:/gi, '<hr><strong>Answer Key:</strong><br>')
            .replace(/([A-D])\)/g, '<span class="quiz-choice">$1)</span>');
        return formatted;
    };

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chat, loading]);

    const sendMessage = async (message) => {
        setChat((prev) => [...prev, { role: 'user', content: message }]);
        setLoading(true);
        setInput('');
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: chat.length === 0
                        ? `Generate a 5 question multiple choice quiz on the topic of ${message}. Provide the answer key at the end.`
                        : `Continue this conversation. User: ${message}`
                }),
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setChat((prev) => [...prev, { role: 'ai', content: formatGeminiOutput(data.text) }]);
        } catch (error) {
            setChat((prev) => [...prev, { role: 'ai', content: `<p>An error occurred: ${error.message}</p>` }]);
        } finally {
            setLoading(false);
        }
    };

    const handleSend = () => {
        if (input.trim()) sendMessage(input.trim());
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleNewChat = () => {
        setChat([]);
        setInput('');
    };

    return (
        <div className="feature-container chat-mode">
            <h2>Quiz Generator</h2>
            <div className="chat-window">
                {chat.length === 0 && (
                    <div className="chat-placeholder">Enter a quiz topic to get started.</div>
                )}
                {chat.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`chat-bubble ${msg.role === 'user' ? 'user' : 'ai'}`}
                        dangerouslySetInnerHTML={{ __html: msg.content }}
                    />
                ))}
                {loading && <div className="chat-bubble ai loading">Generating...</div>}
                <div ref={chatEndRef} />
            </div>
            <div className="chat-input-row">
                <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={chat.length === 0 ? 'Enter the topic for the quiz...' : 'Ask a follow-up or request more detail...'}
                    disabled={loading}
                />
                <button onClick={handleSend} disabled={loading || !input.trim()}>
                    {loading ? '...' : chat.length === 0 ? 'Ask' : 'Send'}
                </button>
                <button className="new-chat-btn" onClick={handleNewChat} disabled={loading}>
                    New Chat
                </button>
            </div>
        </div>
    );
};

export default QuizGenerator;
