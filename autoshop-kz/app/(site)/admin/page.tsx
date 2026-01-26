'use client';

import { useState, useEffect } from 'react';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Lock } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const session = sessionStorage.getItem('admin_session');
    if (session === 'true') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Using a more complex password to avoid browser "data breach" warnings
    // Also allowing 'AutoShop2024' (no !) and 'admin123' for backward compatibility/ease of use
    if (username === 'admin' && (password === 'AutoShop2024!' || password === 'AutoShop2024' || password === 'admin123')) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_session', 'true');
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_session');
  };

  if (isAuthenticated) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <Container className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-neutral-500" />
          </div>
          <h1 className="text-2xl font-bold">Вход в админку</h1>
          <p className="text-neutral-500 mt-2">Введите данные для входа</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Логин</Label>
              <Input
                id="username"
                type="text"
                placeholder="Введите логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 text-lg"
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="text"
                autoComplete="off"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 text-lg font-mono"
                style={{ WebkitTextSecurity: 'disc' }}
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">Неверный логин или пароль</p>}
          </div>
          <Button type="submit" className="w-full h-12 text-lg font-bold bg-primary text-black hover:bg-yellow-500">
            Войти
          </Button>
        </form>

        <div className="mt-6 p-4 bg-neutral-50 rounded-lg text-sm text-neutral-600 text-center border border-neutral-100">
            <p className="font-semibold mb-2 text-neutral-900">Данные для входа (демо):</p>
            <div className="flex flex-col gap-2 items-center">
              <p>Логин: <code className="bg-neutral-200 px-2 py-1 rounded font-bold text-black text-base">admin</code></p>
              <p>Пароль: <code className="bg-neutral-200 px-2 py-1 rounded font-bold text-black text-base">AutoShop2024!</code></p>
            </div>
        </div>
      </div>
    </Container>
  );
}
