import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function Profile() {
  const [user, setUser] = useState({
    name: localStorage.getItem('userName') || '',
    avatar: localStorage.getItem('userAvatar') || ''
  });

  const avatars = [
    '😊', '🤖', '🚀', '⭐', '🎮', '🎨', '🎵', '💡',
    '🔥', '⚡', '🌟', '💎', '🎯', '🏆', '👾', '🎪'
  ];

  const handleSave = () => {
    localStorage.setItem('userName', user.name);
    localStorage.setItem('userAvatar', user.avatar);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 p-4">
      <div className="max-w-2xl mx-auto pt-20">
        <Card className="glass-card p-8 animate-scale-in">
          <div className="text-center mb-8">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-6xl animate-float">
              {user.avatar || '👤'}
            </div>
            <h1 className="text-3xl font-bold gradient-text">Мой Профиль</h1>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Имя</label>
              <Input
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="Введите ваше имя"
                className="bg-muted/50 border-white/10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Выберите аватар</label>
              <div className="grid grid-cols-8 gap-2">
                {avatars.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setUser({ ...user, avatar: emoji })}
                    className={`text-3xl p-3 rounded-lg transition-all hover:scale-110 ${
                      user.avatar === emoji
                        ? 'bg-primary/30 ring-2 ring-primary'
                        : 'bg-muted/30 hover:bg-muted/50'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg py-6"
            >
              <Icon name="Save" className="mr-2" />
              Сохранить профиль
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
