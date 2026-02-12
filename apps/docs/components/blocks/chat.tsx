'use client';

import { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';

type Message = {
  id: number;
  text: string;
  sender: 'me' | 'other';
  time: string;
  status?: 'sent' | 'delivered' | 'read';
};

export function ChatBlock() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hey! Have you tried the new tapcn components?', sender: 'other', time: '10:24 AM' },
    { id: 2, text: 'Not yet! Are they any good?', sender: 'me', time: '10:25 AM', status: 'read' },
    { id: 3, text: 'They\'re amazing. Cross-platform with one codebase. The animations are buttery smooth too.', sender: 'other', time: '10:26 AM' },
    { id: 4, text: 'That sounds perfect for our project!', sender: 'me', time: '10:27 AM', status: 'read' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now(),
      text: input,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');

    // Simulate typing then reply
    setTimeout(() => setIsTyping(true), 800);
    setTimeout(() => {
      setIsTyping(false);
      const replies = [
        'That\'s awesome! Let me check it out.',
        'I love it! The DX is incredible.',
        'Sounds great, let\'s ship it!',
        'Nice! We should add this to our stack.',
      ];
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: replies[Math.floor(Math.random() * replies.length)]!,
          sender: 'other',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 2500);
  };

  return (
    <View className="min-h-full bg-background">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes messagePop {
          0% { opacity: 0; transform: translateY(12px) scale(0.95); }
          60% { transform: translateY(-2px) scale(1.01); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes checkmark {
          from { stroke-dashoffset: 12; }
          to { stroke-dashoffset: 0; }
        }
        .msg-pop { animation: messagePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .msg-stagger-0 { animation: messagePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.05s both; }
        .msg-stagger-1 { animation: messagePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s both; }
        .msg-stagger-2 { animation: messagePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s both; }
        .msg-stagger-3 { animation: messagePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.35s both; }
        .typing-dot { animation: typingDot 1.4s ease-in-out infinite; }
        .typing-dot-2 { animation-delay: 0.2s; }
        .typing-dot-3 { animation-delay: 0.4s; }
        .chat-slide-up { animation: slideUp 0.5s ease-out both; }
        .chat-slide-up-1 { animation: slideUp 0.5s ease-out 0.1s both; }
      `}} />

      <div className="flex min-h-full flex-col">
        {/* Chat Header */}
        <div className={`flex items-center gap-3 border-b border-border px-4 py-3 ${mounted ? 'chat-slide-up' : 'opacity-0'}`}>
          <div className="relative">
            <div className="size-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-sm font-bold text-white">
              SK
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full bg-emerald-500 border-2 border-background" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-semibold">Sarah Kim</h2>
            <p className="text-xs text-emerald-500">Online</p>
          </div>
          <button className="flex size-8 items-center justify-center rounded-full hover:bg-muted transition-colors">
            <svg className="size-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </button>
          <button className="flex size-8 items-center justify-center rounded-full hover:bg-muted transition-colors">
            <svg className="size-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className={`flex-1 overflow-y-auto px-4 py-4 space-y-3 ${mounted ? 'chat-slide-up-1' : 'opacity-0'}`}>
          {messages.map((msg, i) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} ${
                i < 4 ? `msg-stagger-${i}` : 'msg-pop'
              }`}
            >
              <div className={`max-w-[75%] space-y-1`}>
                <div
                  className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.sender === 'me'
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-md'
                      : 'bg-muted rounded-bl-md'
                  }`}
                >
                  {msg.text}
                </div>
                <div className={`flex items-center gap-1 px-1 ${msg.sender === 'me' ? 'justify-end' : ''}`}>
                  <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                  {msg.status && (
                    <span className="text-[10px]">
                      {msg.status === 'read' ? (
                        <svg className="size-3 text-blue-500" viewBox="0 0 16 16" fill="none">
                          <path d="M2 8.5l3.5 3.5L14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg className="size-3 text-muted-foreground" viewBox="0 0 16 16" fill="none">
                          <path d="M2 8.5l3.5 3.5L14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start msg-pop">
              <div className="rounded-2xl rounded-bl-md bg-muted px-4 py-3">
                <div className="flex items-center gap-1">
                  <div className="size-2 rounded-full bg-muted-foreground/50 typing-dot" />
                  <div className="size-2 rounded-full bg-muted-foreground/50 typing-dot typing-dot-2" />
                  <div className="size-2 rounded-full bg-muted-foreground/50 typing-dot typing-dot-3" />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-border px-3 py-3">
          <div className="flex items-end gap-2">
            <button className="flex size-9 shrink-0 items-center justify-center rounded-full hover:bg-muted transition-colors mb-0.5">
              <svg className="size-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
            <div className="flex-1 relative">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="w-full rounded-2xl border border-border bg-muted/50 px-4 py-2.5 pr-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <button
              onClick={sendMessage}
              className={`flex size-9 shrink-0 items-center justify-center rounded-full transition-all mb-0.5 ${
                input.trim()
                  ? 'bg-blue-500 text-white scale-100 hover:bg-blue-600'
                  : 'bg-muted text-muted-foreground scale-90'
              }`}
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </View>
  );
}
