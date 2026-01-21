import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'max';
  timestamp: Date;
  avatar: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Привет! Я Макс, твой голосовой помощник. Чем могу помочь? 🚀',
      sender: 'max',
      timestamp: new Date(),
      avatar: '🤖'
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userAvatar = localStorage.getItem('userAvatar') || '😊';
  const userName = localStorage.getItem('userName') || 'Гость';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
      avatar: userAvatar
    };

    setMessages([...messages, userMessage]);
    const currentInput = input;
    setInput('');

    try {
      const response = await fetch('https://functions.poehali.dev/6644e4af-dcbd-4713-8a03-dee98750bc08', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: currentInput })
      });

      const data = await response.json();

      const maxMessage: Message = {
        id: Date.now() + 1,
        text: data.response || 'Извини, не могу ответить прямо сейчас. Попробуй позже! 🤖',
        sender: 'max',
        timestamp: new Date(),
        avatar: '🤖'
      };

      setMessages((prev) => [...prev, maxMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: 'Упс! Возникла проблема с подключением. Попробуй ещё раз! 🔧',
        sender: 'max',
        timestamp: new Date(),
        avatar: '🤖'
      };

      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleVoice = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'ru-RU';
      recognition.continuous = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognition.start();
    } else {
      alert('Голосовой ввод не поддерживается вашим браузером');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 p-4">
      <div className="max-w-4xl mx-auto pt-20 pb-4 h-screen flex flex-col">
        <Card className="glass-card flex-1 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl animate-pulse-glow">
                🤖
              </div>
              <div>
                <h2 className="text-2xl font-bold">Макс</h2>
                <p className="text-sm text-muted-foreground">Голосовой помощник онлайн</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 animate-fade-in ${
                  message.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${
                  message.sender === 'max'
                    ? 'bg-gradient-to-br from-primary to-secondary'
                    : 'bg-gradient-to-br from-accent to-secondary'
                }`}>
                  {message.avatar}
                </div>
                
                <div className={`max-w-[70%] ${message.sender === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-4 rounded-2xl ${
                    message.sender === 'max'
                      ? 'bg-muted/50'
                      : 'bg-gradient-to-r from-primary to-secondary'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 border-t border-white/10">
            <div className="flex gap-2">
              <Button
                onClick={handleVoice}
                variant="outline"
                size="icon"
                className={`flex-shrink-0 ${isListening ? 'animate-pulse-glow bg-primary/20' : ''}`}
              >
                <Icon name={isListening ? 'MicOff' : 'Mic'} />
              </Button>
              
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Напишите сообщение или используйте голос..."
                className="bg-muted/50 border-white/10"
              />
              
              <Button
                onClick={handleSend}
                className="flex-shrink-0 bg-gradient-to-r from-primary to-secondary"
              >
                <Icon name="Send" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}