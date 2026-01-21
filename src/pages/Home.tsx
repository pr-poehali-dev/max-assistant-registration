import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Home() {
  const navigate = useNavigate();
  const [userName] = useState(localStorage.getItem('userName') || '');
  const [userAvatar] = useState(localStorage.getItem('userAvatar') || '');

  useEffect(() => {
    if (!userName || !userAvatar) {
      navigate('/welcome');
    }
  }, [userName, userAvatar, navigate]);

  const features = [
    {
      icon: 'MessageSquare',
      title: 'Чат с Максом',
      description: 'Общайся с AI помощником голосом или текстом',
      gradient: 'from-purple-500 to-pink-500',
      path: '/chat'
    },
    {
      icon: 'Trophy',
      title: 'Конкурсы',
      description: 'Участвуй и выигрывай призы',
      gradient: 'from-pink-500 to-orange-500',
      path: '/contests'
    },
    {
      icon: 'Gamepad2',
      title: 'Игры',
      description: 'Играй в JChat и другие игры',
      gradient: 'from-cyan-500 to-blue-500',
      path: '/games'
    },
    {
      icon: 'User',
      title: 'Профиль',
      description: 'Настрой имя и аватар',
      gradient: 'from-blue-500 to-purple-500',
      path: '/profile'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-12">
        <div className="text-center mb-16 animate-fade-in">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-6xl animate-float">
            {userAvatar || '🤖'}
          </div>
          
          <h1 className="text-6xl font-bold mb-4">
            Привет, <span className="gradient-text">{userName || 'друг'}</span>! 👋
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Добро пожаловать в мир голосового помощника Макса
          </p>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => navigate('/chat')}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8 py-6 animate-pulse-glow"
            >
              <Icon name="MessageSquare" className="mr-2" />
              Начать общение
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card
              key={index}
              onClick={() => navigate(feature.path)}
              className="glass-card p-6 cursor-pointer hover:scale-105 transition-all duration-300 animate-scale-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:animate-float`}>
                <Icon name={feature.icon as any} size={32} className="text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>

        <Card className="glass-card p-8 text-center">
          <h2 className="text-3xl font-bold gradient-text mb-4">🚀 Возможности Макса</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="space-y-2">
              <div className="text-4xl mb-2">🎤</div>
              <h3 className="font-bold">Голосовое управление</h3>
              <p className="text-sm text-muted-foreground">
                Общайся с Максом голосом на русском языке
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="text-4xl mb-2">🤖</div>
              <h3 className="font-bold">Умный AI</h3>
              <p className="text-sm text-muted-foreground">
                Макс понимает контекст и помогает решать задачи
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="text-4xl mb-2">🎮</div>
              <h3 className="font-bold">Игры и конкурсы</h3>
              <p className="text-sm text-muted-foreground">
                Играй, соревнуйся и выигрывай призы
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
