import { WeatherWidget } from '@/components/WeatherWidget';
import { AliceWidget } from '@/components/AliceWidget';

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            DASHBOARD
          </h1>
          <p className="text-muted-foreground">Ваш персональный помощник</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <WeatherWidget />
          </div>

          <div className="lg:col-span-2">
            <AliceWidget />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Статистика</h3>
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-3xl font-bold text-foreground">1,234</p>
            <p className="text-xs text-muted-foreground mt-2">+12% за неделю</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Активность</h3>
              <span className="text-2xl">⚡</span>
            </div>
            <p className="text-3xl font-bold text-foreground">87%</p>
            <p className="text-xs text-muted-foreground mt-2">Отлично</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Задачи</h3>
              <span className="text-2xl">✅</span>
            </div>
            <p className="text-3xl font-bold text-foreground">42</p>
            <p className="text-xs text-muted-foreground mt-2">18 выполнено</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Уведомления</h3>
              <span className="text-2xl">🔔</span>
            </div>
            <p className="text-3xl font-bold text-foreground">8</p>
            <p className="text-xs text-muted-foreground mt-2">Новые сообщения</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
