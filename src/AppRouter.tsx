import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChatPage } from './pages/ChatPage';
import AdminPage from './pages/AdminPage';
import { SettingsPage } from './pages/SettingsPage';
import { useState } from 'react';

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
  isEditing?: boolean;
}

export function AppRouter() {
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Optional: function to clear messages for "New Chat"
  const clearMessages = () => setMessages([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route 
    path="/chat" 
    element={<ChatPage messages={messages} setMessages={setMessages} clearMessages={clearMessages} />} 
  />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/settings" element={<SettingsPage />} />

        {/* Default route */}
        <Route path="/" element={<Navigate to="/chat" />} />
        <Route path="*" element={<Navigate to="/chat" />} />
      </Routes>
    </BrowserRouter>
  );
}
