/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Leaf, 
  Home, 
  MessageSquare, 
  PlusCircle, 
  BookOpen, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TIERS } from '@/types';
import { cn } from '@/lib/utils';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Market', path: '/dashboard', icon: Home },
    { name: 'Messages', path: '/dashboard/inbox', icon: MessageSquare, badge: user?.unreadCount },
    { name: 'List Harvest', path: '/dashboard/compose', icon: PlusCircle },
    { name: 'Resources', path: '/dashboard/blueprints', icon: BookOpen },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0A0C08] flex selection:bg-maize/30 relative">
      {/* Texture Overlay */}
      <div className="fixed inset-0 grain-overlay pointer-events-none z-[100]" />
      
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-[280px] flex-col glass border-r bg-white/[0.01] sticky top-0 h-screen z-50">
        <div className="p-10 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-brand rounded-xl flex items-center justify-center apple-shadow rotate-[-4deg]">
            <Leaf className="w-4 h-4 text-harvest" />
          </div>
          <span className="text-[20px] font-black tracking-[-0.08em] text-white uppercase">MaizeConnect</span>
        </div>

        <nav className="flex-grow px-6 space-y-1.5 mt-4">
          <div className="px-4 mb-6">
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">Market Nav</span>
          </div>
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-500 group relative overflow-hidden",
                location.pathname === item.path 
                  ? "bg-white/[0.08] text-white ring-1 ring-white/10" 
                  : "text-muted-foreground hover:bg-white/[0.03] hover:text-white"
              )}
            >
              <div className="flex items-center gap-3 relative z-10">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500",
                  location.pathname === item.path ? "bg-maize/10 text-maize" : "bg-white/5 text-muted-foreground group-hover:bg-white/10"
                )}>
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="text-[13px] font-semibold tracking-tight">{item.name}</span>
              </div>
              
              {item.badge ? (
                <div className="bg-maize text-harvest text-[10px] font-black h-5 min-w-5 flex items-center justify-center rounded-full px-1.5 apple-shadow relative z-10">
                  {item.badge}
                </div>
              ) : null}

              {location.pathname === item.path && (
                <motion.div 
                  layoutId="active-nav-glow"
                  className="absolute inset-0 bg-maize/5 blur-xl -z-0"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="p-8 mt-auto space-y-6">
          <div className="glass-thick rounded-[2rem] p-6 border-white/5 apple-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <Avatar className="w-11 h-11 border-2 border-white/10 apple-shadow">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.handle}`} />
                  <AvatarFallback>{user?.handle?.[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-maize border-2 border-[#0A0A0A] rounded-full" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-white truncate">{user?.handle}</span>
                <span className="text-[10px] font-bold text-maize/60 uppercase tracking-widest">{user?.tier} Member</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-muted-foreground tracking-[0.1em] uppercase">Market trust</span>
                <span className="text-[11px] font-mono text-maize">92.4%</span>
              </div>
              <div className="h-1 bg-white/[0.03] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '92.4%' }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="h-full bg-maize"
                />
              </div>
            </div>
          </div>

          <Button 
            variant="ghost" 
            className="w-full h-12 justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-2xl transition-all group px-4"
            onClick={handleLogout}
          >
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mr-3 group-hover:bg-destructive/10">
              <LogOut className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold tracking-widest uppercase">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 w-full z-40 border-b border-white/5 bg-black/40 backdrop-blur-xl h-20 flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-brand rounded-xl flex items-center justify-center">
            <Leaf className="w-5 h-5 text-harvest" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase">MaizeConnect</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)} className="text-white h-12 w-12 rounded-2xl bg-white/5">
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-h-screen pt-20 lg:pt-0 overflow-x-hidden relative">
        {/* Atmospheric Backgrounds */}
        <div className="fixed inset-0 pointer-events-none -z-10 bg-[#050505]">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-maize/5 blur-[120px] rounded-full animate-pill-glow" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-harvest/10 blur-[100px] rounded-full" />
        </div>

        <header className="hidden lg:flex h-[100px] px-12 items-center justify-between sticky top-0 z-40">
          <div className="flex flex-col">
            <h2 className="text-[24px] font-black text-white tracking-[-0.04em]">
              {location.pathname === '/dashboard' ? `Welcome, ${user?.handle}` : navItems.find(i => i.path === location.pathname)?.name}
            </h2>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-[9px] font-bold text-maize/40 tracking-[0.2em] uppercase">Node.ZIM / Active</span>
              <div className="w-1 h-1 rounded-full bg-maize animate-pulse" />
              <span className="text-[9px] font-bold text-white/20 tracking-[0.2em] uppercase">v1.2.0-maize</span>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 bg-white/[0.02] border-white/5 px-6 h-12 rounded-2xl glass apple-shadow">
              <TrendingUp className="w-4 h-4 text-maize" />
              <span className="text-[11px] font-bold text-white tracking-[0.1em]">{user?.streak} Day active</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Link to="/dashboard/compose">
                <Button size="lg" className="bg-maize text-harvest hover:bg-maize/90 font-bold text-[11px] tracking-[0.1em] h-12 px-8 rounded-2xl apple-shadow hover:scale-[1.02] active:scale-[0.98] transition-all uppercase">
                  List Harvest
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl glass hover:bg-white/5 transition-all relative">
                <Bell className="w-5 h-5 text-muted-foreground" />
                {user?.unreadCount ? (
                  <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-maize rounded-full ring-2 ring-background" />
                ) : null}
              </Button>
            </div>
            
            <div className="h-10 w-px bg-white/10 mx-2" />
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 pl-4 cursor-pointer group" 
              onClick={() => navigate('/dashboard/settings')}
            >
              <div className="text-right hidden xl:block">
                <div className="text-sm font-bold text-white group-hover:text-maize transition-colors">{user?.handle}</div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-40">Market Participant</div>
              </div>
              <Avatar className="w-12 h-12 border-2 border-white/5 group-hover:border-emerald/30 transition-all apple-shadow">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.handle}`} />
                <AvatarFallback>{user?.handle?.[0].toUpperCase()}</AvatarFallback>
              </Avatar>
            </motion.div>
          </div>
        </header>

        <div className="flex-grow p-8 lg:p-12 max-w-[1600px] mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
