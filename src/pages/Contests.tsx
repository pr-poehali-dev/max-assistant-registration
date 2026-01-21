import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Contests() {
  const contests = [
    {
      title: 'Конкурс недели',
      prize: '🏆 Главный приз',
      deadline: '3 дня',
      participants: 142,
      status: 'active'
    },
    {
      title: 'Турнир месяца',
      prize: '💎 Эксклюзивные награды',
      deadline: '2 недели',
      participants: 89,
      status: 'active'
    },
    {
      title: 'Спец. событие',
      prize: '⭐ Уникальный титул',
      deadline: '5 дней',
      participants: 67,
      status: 'new'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 p-4">
      <div className="max-w-6xl mx-auto pt-20">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold gradient-text mb-4">Конкурсы</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Участвуйте и выигрывайте призы
          </p>
          
          <Button
            onClick={() => window.open('https://t.me/MaxPoehali', '_blank')}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8 py-6 animate-pulse-glow"
          >
            <Icon name="Send" className="mr-2" />
            Чат конкурсов в Telegram
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {contests.map((contest, index) => (
            <Card
              key={index}
              className="glass-card p-6 hover:scale-105 transition-all duration-300 animate-scale-in relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {contest.status === 'new' && (
                <div className="absolute top-4 right-4 bg-accent text-white text-xs px-3 py-1 rounded-full font-bold">
                  НОВОЕ
                </div>
              )}
              
              <div className="text-4xl mb-4">{contest.prize.split(' ')[0]}</div>
              
              <h3 className="text-2xl font-bold mb-2">{contest.title}</h3>
              <p className="text-lg text-primary font-semibold mb-4">{contest.prize}</p>
              
              <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} />
                  <span>Осталось: {contest.deadline}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Users" size={16} />
                  <span>Участников: {contest.participants}</span>
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Icon name="Trophy" className="mr-2" />
                Участвовать
              </Button>
            </Card>
          ))}
        </div>

        <Card className="glass-card p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Правила участия</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="flex gap-3">
              <Icon name="CheckCircle" className="text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">Зарегистрируйтесь</h3>
                <p className="text-sm text-muted-foreground">Создайте профиль с именем и аватаром</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Icon name="Send" className="text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">Присоединяйтесь</h3>
                <p className="text-sm text-muted-foreground">Вступите в наш Telegram канал</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Icon name="Trophy" className="text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">Побеждайте</h3>
                <p className="text-sm text-muted-foreground">Выполняйте задания и получайте призы</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
