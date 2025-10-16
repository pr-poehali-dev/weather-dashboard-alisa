import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
  humidity: number;
  windSpeed: number;
}

export const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=55.7558&longitude=37.6173&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=Europe/Moscow');
        const data = await response.json();
        
        const weatherCode = data.current.weather_code;
        let condition = 'Ясно';
        if (weatherCode > 0 && weatherCode < 3) condition = 'Переменная облачность';
        else if (weatherCode >= 3 && weatherCode < 50) condition = 'Облачно';
        else if (weatherCode >= 50) condition = 'Осадки';

        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          condition,
          location: 'Москва',
          humidity: data.current.relative_humidity_2m,
          windSpeed: Math.round(data.current.wind_speed_10m)
        });
      } catch (error) {
        console.error('Ошибка загрузки погоды:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card className="p-6 bg-card border-border">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-32"></div>
          <div className="h-16 bg-muted rounded w-24"></div>
        </div>
      </Card>
    );
  }

  if (!weather) return null;

  return (
    <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-foreground">Погода</h3>
          <Icon name="CloudSun" size={28} className="text-primary" />
        </div>
        
        <div className="space-y-2">
          <div className="text-5xl font-semibold text-foreground">
            {weather.temperature}°
          </div>
          <div className="text-muted-foreground">{weather.condition}</div>
          <div className="text-sm text-muted-foreground">{weather.location}</div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Icon name="Droplets" size={16} className="text-primary" />
            <span className="text-sm text-muted-foreground">{weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Wind" size={16} className="text-primary" />
            <span className="text-sm text-muted-foreground">{weather.windSpeed} м/с</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
