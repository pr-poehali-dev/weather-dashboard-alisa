import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const AliceWidget = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    setTimeout(() => {
      const aliceMessage: Message = {
        text: 'Для подключения YandexGPT API добавьте секрет YANDEX_GPT_API_KEY в настройках проекта.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aliceMessage]);
    }, 1000);
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      toast({
        title: "Голосовой ввод",
        description: "Для работы голосового ввода требуется интеграция с Yandex SpeechKit API"
      });
    }
  };

  return (
    <Card className="bg-card border-border overflow-hidden transition-all duration-300 hover:border-primary/50">
      <div 
        className="p-6 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
            <span className="text-2xl">🎙️</span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-foreground">Яндекс Алиса</h3>
            <p className="text-sm text-muted-foreground">YandexGPT ассистент</p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={24} 
          className="text-muted-foreground"
        />
      </div>

      {isExpanded && (
        <div className="border-t border-border">
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-background/50">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                <Icon name="MessageSquare" size={48} className="mx-auto mb-4 opacity-50" />
                <p>Начните диалог с Алисой</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {msg.timestamp.toLocaleTimeString('ru-RU', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-border bg-card">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
                placeholder="Введите сообщение..."
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button
                onClick={handleVoiceInput}
                variant="outline"
                size="icon"
                className={isRecording ? 'bg-primary text-primary-foreground' : ''}
              >
                <Icon name={isRecording ? "MicOff" : "Mic"} size={20} />
              </Button>
              <Button 
                onClick={() => sendMessage(inputText)}
                className="bg-primary hover:bg-primary/90"
              >
                <Icon name="Send" size={20} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
