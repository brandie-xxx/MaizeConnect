/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Loader2, Check, X, User, Mail, Lock, ShieldCheck, KeyIcon } from 'lucide-react';
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
import { HandleService } from '@/services';
import { cn } from '@/lib/utils';

const registerSchema = z.object({
  handle: z.string().min(3, 'Handle must be at least 3 characters').regex(/^[a-z0-9.]+$/, 'Only lowercase letters, numbers, and dots allowed'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [handleStatus, setHandleStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const watchedHandle = watch('handle');
  const watchedPassword = watch('password');

  // Handle availability check
  useEffect(() => {
    if (!watchedHandle || watchedHandle.length < 3) {
      setHandleStatus('idle');
      return;
    }

    const timer = setTimeout(async () => {
      setHandleStatus('checking');
      const isAvailable = await HandleService.checkAvailability(watchedHandle);
      setHandleStatus(isAvailable ? 'available' : 'taken');
    }, 500);

    return () => clearTimeout(timer);
  }, [watchedHandle]);

  // Password strength meter
  useEffect(() => {
    if (!watchedPassword) {
      setPasswordStrength(0);
      return;
    }
    let strength = 0;
    if (watchedPassword.length >= 8) strength += 1;
    if (/[A-Z]/.test(watchedPassword)) strength += 1;
    if (/[a-z]/.test(watchedPassword)) strength += 1;
    if (/[0-9]/.test(watchedPassword)) strength += 1;
    if (/[^A-Za-z0-9]/.test(watchedPassword)) strength += 1;
    setPasswordStrength(strength);
  }, [watchedPassword]);

  const onSubmit = async (data: RegisterFormValues) => {
    if (handleStatus !== 'available') {
      toast.error('Please choose an available handle');
      return;
    }
    setIsSubmitting(true);
    try {
      await authRegister(data.email, data.password, data.handle);
      toast.success('Account created successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-destructive';
    if (passwordStrength <= 4) return 'bg-yellow-500';
    return 'bg-emerald';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 4) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-black flex overflow-hidden font-sans selection:bg-emerald/30 relative">
      <div className="fixed inset-0 grain-overlay pointer-events-none z-[100]" />
      
      {/* Visual Pane: High-Impact Editorial */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-neutral-900 border-r border-white/5">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.75, scale: 1 }}
          transition={{ duration: 2.5 }}
          className="absolute inset-0"
        >
          <img 
            src="https://picsum.photos/seed/maize_basket/1080/1920" 
            alt="Maize Connect" 
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
              <ShieldCheck className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-harvest" />
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.85]">
                Gateway <br /> Enrollment.
              </h1>
              <p className="text-2xl text-white/70 font-bold leading-relaxed max-w-sm">
                "Digital sovereignty for the Zimbabwean grain marketplace."
              </p>
            </div>
            
            <div className="flex items-center gap-6 md:gap-8 lg:gap-12 pt-6 md:pt-8 lg:pt-12">
              <div className="space-y-2">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tighter tabular-nums">4.2.0</div>
                <div className="text-[10px] font-bold tracking-[0.2em] opacity-60 text-emerald uppercase">Protocol version</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="space-y-2">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tighter tabular-nums">1.4M</div>
                <div className="text-[10px] font-bold tracking-[0.2em] opacity-60 text-emerald uppercase">Yield mesh</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Form Pane */}
      <div className="w-full lg:w-1/2 overflow-y-auto px-4 sm:px-6 py-12 sm:py-16 lg:p-32 flex flex-col justify-center bg-black">
        <div className="max-w-[480px] mx-auto w-full space-y-10 md:space-y-12 lg:space-y-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/" className="inline-flex items-center gap-4 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/10 group-hover:rotate-12 transition-transform duration-500 apple-shadow">
                <KeyIcon className="w-6 h-6 text-emerald" />
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tighter font-sans">EXXCRYPT</span>
            </Link>
          </motion.div>

          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">Identity ignition.</h2>
            <p className="text-white/70 font-medium">Generate your sovereign credentials for the lattice.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8 lg:space-y-10">
            <div className="space-y-5 md:space-y-6 lg:space-y-8">
              <div className="space-y-4">
                <Label className="text-[10px] font-bold tracking-[0.4em] text-white/20 ml-2 uppercase">Handle</Label>
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-emerald transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <Input 
                    placeholder="sovereign.node"
                    className="h-14 sm:h-16 md:h-20 bg-white/[0.03] border-white/10 rounded-2xl md:rounded-[2rem] px-12 md:px-16 focus:bg-white/5 focus:border-emerald/50 transition-all text-white font-medium apple-shadow"
                    {...register('handle')}
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2">
                    {handleStatus === 'checking' && <Loader2 className="w-6 h-6 animate-spin text-muted-foreground transition-all" />}
                    {handleStatus === 'available' && <Check className="w-6 h-6 text-emerald animate-in zoom-in" />}
                    {handleStatus === 'taken' && <X className="w-6 h-6 text-destructive animate-in" />}
                  </div>
                </div>
                {errors.handle && <p className="text-[10px] text-destructive font-bold ml-4">{errors.handle.message}</p>}
                {handleStatus === 'taken' && <p className="text-[10px] text-destructive font-bold ml-4 lowercase">Handle already identified in the mesh.</p>}
              </div>

              <div className="space-y-4">
                <Label className="text-[10px] font-bold tracking-[0.4em] text-white/20 ml-2 uppercase">Identity hub</Label>
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-emerald transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <Input 
                    type="email"
                    placeholder="email@mesh.node"
                    className="h-14 sm:h-16 md:h-20 bg-white/[0.03] border-white/10 rounded-2xl md:rounded-[2rem] px-12 md:px-16 focus:bg-white/5 focus:border-emerald/50 transition-all text-white font-medium apple-shadow"
                    {...register('email')}
                  />
                </div>
                {errors.email && <p className="text-[10px] text-destructive font-bold ml-4">{errors.email.message}</p>}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <Label className="text-[10px] font-bold tracking-[0.4em] text-white/20 uppercase">Lattice passphrase</Label>
                  <span className={cn("text-[10px] font-bold tracking-[0.1em] px-2 py-0.5 rounded bg-white/5 uppercase", passwordStrength >= 4 ? "text-emerald" : "text-white/30")}>
                    {getStrengthText()}
                  </span>
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
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex gap-1 px-1 py-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div 
                      key={s}
                      className={cn(
                        "h-full flex-1 rounded-full transition-all duration-500",
                        passwordStrength >= s ? getStrengthColor() : "bg-white/5"
                      )}
                    />
                  ))}
                </div>
                {errors.password && <p className="text-[10px] text-destructive font-bold ml-4">{errors.password.message}</p>}
              </div>

              <div className="space-y-4">
                <Label className="text-[10px] font-bold tracking-[0.4em] text-white/20 ml-2 uppercase">Verify decryption key</Label>
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-emerald transition-colors">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <Input 
                    type="password"
                    placeholder="••••••••••••"
                    className="h-14 sm:h-16 md:h-20 bg-white/[0.03] border-white/10 rounded-2xl md:rounded-[2rem] px-12 md:px-16 focus:bg-white/5 focus:border-emerald/50 transition-all text-white font-medium apple-shadow"
                    {...register('confirmPassword')}
                  />
                </div>
                {errors.confirmPassword && <p className="text-[10px] text-destructive font-bold ml-4">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting || handleStatus === 'taken'}
              className="w-full h-14 sm:h-16 md:h-20 bg-white text-black hover:bg-emerald hover:text-white rounded-2xl md:rounded-[2rem] font-bold text-xs tracking-[0.3em] apple-shadow-lg transition-all active:scale-95 disabled:opacity-50 uppercase"
            >
              {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin mr-4 inline" /> : null}
              Confirm protocol initiation
            </Button>
          </form>

          <p className="text-center text-sm font-medium text-white/60 tracking-tight">
            Already registered? <Link to="/auth/login" className="text-emerald hover:underline font-bold">Login to gateway</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
