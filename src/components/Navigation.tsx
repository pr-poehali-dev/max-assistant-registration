import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/welcome') return null;

  const navItems = [
    { icon: 'Home', label: 'Главная', path: '/' },
    { icon: 'MessageSquare', label: 'Чат', path: '/chat' },
    { icon: 'Trophy', label: 'Конкурсы', path: '/contests' },
    { icon: 'Gamepad2', label: 'Игры', path: '/games' },
    { icon: 'User', label: 'Профиль', path: '/profile' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl">
              🤖
            </div>
            <span className="text-xl font-bold gradient-text">Макс</span>
          </div>

          <div className="flex gap-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  location.pathname === item.path
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={item.icon as any} size={20} />
                <span className="hidden md:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
