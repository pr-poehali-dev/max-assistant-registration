import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Games() {
  const games = [
    {
      name: 'JChat',
      description: 'Многопользовательская игра с чатом',
      url: 'https://global.julianseditor.com/app/GD%3A3517590%3A147/?p=eyJtb2RlIjoiMSIsImdhbWVJZCI6IkdEOjM1MTc1OTA6MTQ3Iiwicm9vbUlkIjoiIiwicm9sZUlkIjoiMCJ9&tap=1',
      icon: '🎮',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 p-4">
      <div className="max-w-6xl mx-auto pt-20">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold gradient-text mb-4">Наши Игры</h1>
          <p className="text-muted-foreground text-lg">
            Играйте, соревнуйтесь и побеждайте!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <Card
              key={index}
              className="glass-card p-6 hover:scale-105 transition-all duration-300 animate-scale-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center text-4xl mb-4 group-hover:animate-float`}>
                {game.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-2">{game.name}</h3>
              <p className="text-muted-foreground mb-6">{game.description}</p>
              
              <Button
                onClick={() => window.open(game.url, '_blank')}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                <Icon name="Gamepad2" className="mr-2" />
                Играть сейчас
              </Button>
            </Card>
          ))}

          <Card className="glass-card p-6 flex flex-col items-center justify-center text-center opacity-50">
            <Icon name="Plus" size={48} className="mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Скоро новые игры...</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
