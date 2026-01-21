import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

type TabType = 'home' | 'profile' | 'games' | 'contests' | 'chat';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [userName, setUserName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('1');
  const [isListening, setIsListening] = useState(false);

  const avatarOptions = ['1', '2', '3', '4', '5', '6'];

  const handleRegister = () => {
    if (userName.trim()) {
      setIsRegistered(true);
      setShowRegistration(false);
    }
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
  };

  const renderContent = () => {
    if (!isRegistered) {
      return (
        <div className="flex items-center justify-center min-h-screen p-6">
          <Card className="glass-card p-8 max-w-md w-full text-center animate-scale-in">
            <div className="mb-6 animate-float">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center glow-effect">
                <Icon name="Bot" size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-3 gradient-text">
              Макс
            </h1>
            <p className="text-muted-foreground mb-6 text-lg">
              Твой голосовой помощник с ИИ
            </p>
            <Button 
              onClick={() => setShowRegistration(true)}
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all"
            >
              Начать
            </Button>
          </Card>
        </div>
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-6 animate-fade-in">
            <div className="mb-8 relative">
              <div 
                className={`w-40 h-40 bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center cursor-pointer transition-all ${
                  isListening ? 'animate-pulse-glow scale-110' : 'glow-effect'
                }`}
                onClick={toggleVoice}
              >
                <Icon 
                  name={isListening ? "MicOff" : "Mic"} 
                  size={64} 
                  className="text-white" 
                />
              </div>
              {isListening && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 animate-fade-in">
                  <Badge className="bg-accent text-white">Слушаю...</Badge>
                </div>
              )}
            </div>
            <h2 className="text-3xl font-bold mb-3 gradient-text">
              Привет, {userName}!
            </h2>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              Нажми на микрофон и задай любой вопрос. Я помогу тебе с информацией, советами и многим другим!
            </p>
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <Card className="glass-card p-4 hover:scale-105 transition-transform cursor-pointer">
                <Icon name="Sparkles" size={32} className="text-primary mb-2" />
                <p className="text-sm font-semibold">Умные ответы</p>
              </Card>
              <Card className="glass-card p-4 hover:scale-105 transition-transform cursor-pointer">
                <Icon name="Zap" size={32} className="text-secondary mb-2" />
                <p className="text-sm font-semibold">Быстрый поиск</p>
              </Card>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="p-6 max-w-2xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 gradient-text">Профиль</h2>
            <Card className="glass-card p-6">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="w-20 h-20 border-4 border-primary">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedAvatar}`} />
                  <AvatarFallback>{userName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-2xl font-bold">{userName}</h3>
                  <Badge className="mt-2 bg-primary">Активный пользователь</Badge>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Icon name="Trophy" className="text-accent" size={24} />
                    <span>Участие в конкурсах</span>
                  </div>
                  <Badge variant="secondary">0</Badge>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Icon name="MessageSquare" className="text-secondary" size={24} />
                    <span>Сообщений в чате</span>
                  </div>
                  <Badge variant="secondary">0</Badge>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Icon name="Gamepad2" className="text-primary" size={24} />
                    <span>Игр сыграно</span>
                  </div>
                  <Badge variant="secondary">0</Badge>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'games':
        return (
          <div className="p-6 max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 gradient-text">Наши Игры</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-card p-6 hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4">
                  <Icon name="Gamepad2" size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">JChat</h3>
                <p className="text-muted-foreground mb-4">
                  Увлекательная игра с друзьями и новыми знакомствами
                </p>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => window.open('https://global.julianseditor.com/app/GD%3A3517590%3A147/?p=eyJtb2RlIjoiMSIsImdhbWVJZCI6IkdEOjM1MTc1OTA6MTQ3Iiwicm9vbUlkIjoiIiwicm9sZUlkIjoiMCJ9&tap=1', '_blank')}
                >
                  Играть сейчас
                </Button>
              </Card>
              <Card className="glass-card p-6 opacity-50">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mb-4">
                  <Icon name="Rocket" size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Скоро...</h3>
                <p className="text-muted-foreground mb-4">
                  Новые игры уже в разработке!
                </p>
                <Button className="w-full" disabled>
                  В разработке
                </Button>
              </Card>
            </div>
          </div>
        );

      case 'contests':
        return (
          <div className="p-6 max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 gradient-text">Конкурсы</h2>
            <Card className="glass-card p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Trophy" size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Актуальные конкурсы</h3>
                  <p className="text-muted-foreground mb-4">
                    Следи за новыми конкурсами и участвуй в розыгрышах призов!
                  </p>
                  <Button 
                    className="bg-accent hover:bg-accent/90"
                    onClick={() => window.open('https://t.me/MaxPoehali', '_blank')}
                  >
                    <Icon name="Send" size={18} className="mr-2" />
                    Чат конкурсов в Telegram
                  </Button>
                </div>
              </div>
            </Card>
            <div className="grid md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="glass-card p-4 opacity-60">
                  <Badge className="mb-3 bg-muted">Скоро</Badge>
                  <h4 className="font-semibold mb-2">Конкурс #{i}</h4>
                  <p className="text-sm text-muted-foreground">Следите за обновлениями</p>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'chat':
        return (
          <div className="p-6 max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 gradient-text">Чат</h2>
            <Card className="glass-card p-6 h-[600px] flex flex-col">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=max" />
                  </Avatar>
                  <div className="bg-muted rounded-2xl p-3 max-w-[70%]">
                    <p className="text-sm">Привет! Я Макс, твой голосовой помощник. Чем могу помочь?</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Input 
                  placeholder="Напиши сообщение..." 
                  className="flex-1"
                />
                <Button size="icon" className="bg-primary hover:bg-primary/90">
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderContent()}

      {isRegistered && (
        <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-white/10 z-50">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex justify-around items-center h-20">
              {[
                { id: 'home', icon: 'Home', label: 'Главная' },
                { id: 'profile', icon: 'User', label: 'Профиль' },
                { id: 'games', icon: 'Gamepad2', label: 'Игры' },
                { id: 'contests', icon: 'Trophy', label: 'Конкурсы' },
                { id: 'chat', icon: 'MessageSquare', label: 'Чат' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex flex-col items-center gap-1 transition-all ${
                    activeTab === tab.id 
                      ? 'text-primary scale-110' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab.icon as any} size={24} />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}

      <Dialog open={showRegistration} onOpenChange={setShowRegistration}>
        <DialogContent className="glass-card border-white/10">
          <DialogHeader>
            <DialogTitle className="text-2xl gradient-text text-center">
              Создай свой профиль
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Твоё имя</label>
              <Input 
                placeholder="Введи своё имя"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="bg-muted/50"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-3 block">Выбери аватар</label>
              <div className="grid grid-cols-6 gap-3">
                {avatarOptions.map((seed) => (
                  <button
                    key={seed}
                    onClick={() => setSelectedAvatar(seed)}
                    className={`w-full aspect-square rounded-full overflow-hidden border-2 transition-all ${
                      selectedAvatar === seed 
                        ? 'border-primary scale-110' 
                        : 'border-transparent hover:border-muted'
                    }`}
                  >
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
                      alt={`Avatar ${seed}`}
                      className="w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>
            <Button 
              onClick={handleRegister}
              disabled={!userName.trim()}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              size="lg"
            >
              Готово
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
