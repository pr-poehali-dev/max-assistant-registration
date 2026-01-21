import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Welcome() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  const avatars = [
    '😊', '😎', '🤖', '🚀', '⭐', '🎮', '🎨', '🎵',
    '💡', '🔥', '⚡', '🌟', '💎', '🎯', '🏆', '👾'
  ];

  const handleComplete = () => {
    if (name && avatar) {
      localStorage.setItem('userName', name);
      localStorage.setItem('userAvatar', avatar);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/10 to-secondary/10 flex items-center justify-center p-4">
      <Card className="glass-card p-8 max-w-2xl w-full animate-scale-in">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-5xl animate-float">
            🤖
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Добро пожаловать!
          </h1>
          <p className="text-muted-foreground">
            Познакомимся с голосовым помощником Максом
          </p>
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-lg font-medium mb-3">
                Как тебя зовут?
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Введи своё имя"
                className="text-lg py-6 bg-muted/50 border-white/10"
                autoFocus
              />
            </div>

            <Button
              onClick={() => name && setStep(2)}
              disabled={!name}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg py-6"
            >
              Далее
              <Icon name="ArrowRight" className="ml-2" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-lg font-medium mb-3">
                Выбери свой аватар
              </label>
              <div className="grid grid-cols-8 gap-3">
                {avatars.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setAvatar(emoji)}
                    className={`text-4xl p-4 rounded-xl transition-all hover:scale-110 ${
                      avatar === emoji
                        ? 'bg-primary/30 ring-2 ring-primary animate-pulse-glow'
                        : 'bg-muted/30 hover:bg-muted/50'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="flex-1 py-6"
              >
                <Icon name="ArrowLeft" className="mr-2" />
                Назад
              </Button>
              
              <Button
                onClick={handleComplete}
                disabled={!avatar}
                className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 py-6"
              >
                Начать
                <Icon name="Sparkles" className="ml-2" />
              </Button>
            </div>
          </div>
        )}

        <div className="flex justify-center gap-2 mt-8">
          <div className={`w-2 h-2 rounded-full transition-all ${step === 1 ? 'bg-primary w-8' : 'bg-muted'}`} />
          <div className={`w-2 h-2 rounded-full transition-all ${step === 2 ? 'bg-primary w-8' : 'bg-muted'}`} />
        </div>
      </Card>
    </div>
  );
}
