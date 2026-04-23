/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Loader2, Mail, Lock, User, KeyIcon, Leaf } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);
      toast.success('Signed in to MaizeConnect');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex overflow-hidden font-sans selection:bg-emerald/30 relative">
      <div className="fixed inset-0 grain-overlay pointer-events-none z-[100]" />
      
      {/* Visual Pane */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-neutral-900 border-r border-white/5">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.75, scale: 1 }}
          transition={{ duration: 2.5 }}
          className="absolute inset-0"
        >
          <img 
            src="https://picsum.photos/seed/maize_growth/1080/1920" 
            alt="Agricultural Trade" 
            className="w-full h-full object-cover filter grayscale contrast-125 brightness-50"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 sm:p-12 md:p-16 lg:p-24 flex flex-col justify-end relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 md:space-y-8 lg:space-y-12"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center apple-shadow-lg">
              <Leaf className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-harvest" />
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.85]">
                Gateway <br /> Access.
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/60 font-bold leading-relaxed max-w-sm">
                "Digital sovereignty for the Zimbabwean grain marketplace."
              </p>
            </div>
            
            <div className="flex items-center gap-6 md:gap-8 lg:gap-12 pt-6 md:pt-8 lg:pt-12">
              <div className="space-y-2">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tighter tabular-nums">99.9%</div>
                <div className="text-[10px] font-bold tracking-[0.2em] opacity-60 text-emerald uppercase">Platform Uptime</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="space-y-2">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tighter tabular-nums">1.4M t</div>
                <div className="text-[10px] font-bold tracking-[0.2em] opacity-60 text-emerald uppercase">Annual Yield</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Form Pane */}
      <div className="w-full lg:w-1/2 overflow-y-auto px-4 sm:px-6 py-12 sm:py-16 lg:p-32 flex flex-col justify-center bg-black">
        <div className="max-w-[440px] mx-auto w-full space-y-10 md:space-y-12 lg:space-y-16">
          <Link to="/" className="inline-flex items-center gap-4 group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/10 group-hover:rotate-12 transition-transform duration-500 apple-shadow">
              <KeyIcon className="w-6 h-6 text-emerald" />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tighter font-sans">MAIZECONNECT</span>
          </Link>

          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">Gateway access.</h2>
            <p className="text-white/70 font-medium">Re-establish your connection to the national trade network.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8 lg:space-y-10">
            <div className="space-y-5 md:space-y-6 lg:space-y-8">
              <div className="space-y-4">
                <Label className="text-[10px] font-bold tracking-[0.4em] text-white/60 ml-2 uppercase">Account identifier</Label>
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-emerald transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <Input 
                    type="email"
                    placeholder="email@sovereign.node"
                    className="h-14 sm:h-16 md:h-20 bg-white/[0.03] border-white/10 rounded-2xl md:rounded-[2rem] px-12 md:px-16 focus:bg-white/5 focus:border-emerald/50 transition-all text-white font-medium apple-shadow"
                    {...register('email')}
                  />
                </div>
                {errors.email && <p className="text-[10px] text-destructive font-bold ml-4">{errors.email.message}</p>}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <Label className="text-[10px] font-bold tracking-[0.4em] text-white/60 uppercase">Secret key</Label>
                  <Link to="#" className="text-[10px] font-bold tracking-widest text-emerald/90 hover:text-white transition-colors uppercase">Trouble logging in?</Link>
                </div>
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-emerald transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <Input 
                    type="password"
                    placeholder="••••••••••••"
                    className="h-14 sm:h-16 md:h-20 bg-white/[0.03] border-white/10 rounded-2xl md:rounded-[2rem] px-12 md:px-16 focus:bg-white/5 focus:border-emerald/50 transition-all text-white font-medium apple-shadow"
                    {...register('password')}
                  />
                </div>
                {errors.password && <p className="text-[10px] text-destructive font-bold ml-4">{errors.password.message}</p>}
              </div>

              <div className="flex items-center space-x-3 px-4">
                <input 
                  type="checkbox" 
                  id="remember"
                  className="w-5 h-5 rounded-lg bg-white/5 border-white/10 text-emerald focus:ring-0 transition-all cursor-pointer"
                  {...register('rememberMe')}
                />
                <Label htmlFor="remember" className="text-[11px] font-bold text-white/40 tracking-widest cursor-pointer hover:text-white transition-colors uppercase">Maintain connectivity</Label>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-14 sm:h-16 md:h-20 bg-white text-black hover:bg-emerald hover:text-white rounded-2xl md:rounded-[2rem] font-bold text-xs tracking-[0.3em] apple-shadow-lg transition-all active:scale-95 disabled:opacity-50 uppercase"
            >
              {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin mr-4 inline" /> : null}
              Authorize ingress
            </Button>
          </form>

          <p className="text-center text-sm font-medium text-white/60 tracking-tight">
            New to the platform? <Link to="/auth/register" className="text-emerald hover:underline font-bold">Register today</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
