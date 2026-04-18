import { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Check, 
  Loader2,
  TrendingUp,
  MapPin,
  ChevronRight,
  Leaf
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [handle, setHandle] = useState(user?.handle || '');

  const handleSaveProfile = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success('Market profile synchronized.');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 px-4">
      <div className="space-y-4">
        <span className="text-[10px] font-bold tracking-[0.4em] text-maize uppercase">System Config</span>
        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none">Market Settings</h1>
      </div>

      <Tabs defaultValue="profile" className="space-y-12">
        <div className="overflow-x-auto pb-4 scrollbar-none">
          <TabsList className="glass border border-white/5 p-2 h-16 rounded-[1.5rem] apple-shadow w-max flex gap-2">
            {[
              { id: 'profile', icon: User, label: 'Profile' },
              { id: 'security', icon: Shield, label: 'Security' },
              { id: 'tiers', icon: TrendingUp, label: 'Tiers' },
              { id: 'notifications', icon: Bell, label: 'Alerts' },
            ].map((tab) => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id} 
                className="rounded-xl data-[state=active]:bg-maize/10 data-[state=active]:text-maize data-[state=active]:apple-shadow transition-all px-8 h-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 border-transparent data-[state=active]:border-white/10 border"
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="profile" className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <Card className="glass p-10 rounded-[3rem] apple-shadow border-white/5 space-y-10 border">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white tracking-tight">Trader Identity</h3>
                  <p className="text-white/40 font-medium">Update your public market handle and contact region.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <Label className="text-[10px] font-bold text-maize uppercase tracking-widest ml-1">Market Handle</Label>
                    <Input 
                      value={handle} 
                      onChange={(e) => setHandle(e.target.value)}
                      className="h-14 glass border-white/5 rounded-2xl focus:bg-white/10 transition-all font-bold tracking-tight text-lg text-white px-6"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label className="text-[10px] font-bold text-maize uppercase tracking-widest ml-1">Archive Email</Label>
                    <Input 
                      value={user?.email} 
                      disabled 
                      className="h-14 bg-white/[0.02] border-white/5 rounded-2xl opacity-40 font-bold text-white px-6"
                    />
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex justify-end">
                  <Button className="bg-maize text-harvest hover:bg-white rounded-2xl px-12 h-14 font-black text-[11px] uppercase tracking-widest apple-shadow transition-all" onClick={handleSaveProfile} disabled={isSaving}>
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-3" /> : <Check className="w-4 h-4 mr-3" />}
                    Sync Profile
                  </Button>
                </div>
              </Card>

              <Card className="glass p-10 rounded-[3rem] apple-shadow border-white/5 space-y-8 border">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white tracking-tight">Public Card</h3>
                  <p className="text-white/40 font-medium">How other nodes see you in the marketplace.</p>
                </div>
                <div className="p-8 glass bg-white/[0.02] rounded-[2.5rem] border border-white/5 flex items-center justify-between group overflow-hidden">
                   <div className="flex items-center gap-8 relative z-10">
                      <div className="w-20 h-20 rounded-[2rem] bg-gradient-brand text-harvest text-3xl font-black flex items-center justify-center apple-shadow group-hover:rotate-6 transition-transform">
                        {user?.handle[0].toUpperCase()}
                      </div>
                      <div className="space-y-1">
                         <div className="text-2xl font-black text-white tracking-tight">{user?.handle}</div>
                         <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Verified Harvest Participant</div>
                      </div>
                   </div>
                   <Badge className="bg-maize/20 text-maize border-maize/10 px-4 py-1.5 rounded-full font-black tracking-widest text-[9px]">ACTIVE NODE</Badge>
                </div>
              </Card>
            </div>

            <div className="space-y-10">
               <Card className="bg-harvest p-10 rounded-[3rem] border border-maize/20 apple-shadow relative overflow-hidden group">
                  <div className="absolute inset-0 grain-overlay opacity-20 pointer-events-none" />
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform mb-8">
                     <Leaf className="w-7 h-7 text-white" />
                  </div>
                  <div className="space-y-4 relative z-10">
                     <h4 className="text-2xl font-black text-white tracking-tight">Member Status</h4>
                     <p className="text-sm font-bold text-white/60 leading-relaxed uppercase tracking-wider">
                        You are currently on the <span className="text-maize font-bold">{user?.tier}</span> tier. Enjoy full marketplace access and USSD priority routing.
                     </p>
                  </div>
                  <Button variant="outline" className="w-full h-14 border-white/10 glass rounded-2xl font-bold text-[10px] uppercase tracking-widest text-white mt-8">View Tier Benefits</Button>
               </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
           <Card className="glass p-10 rounded-[3rem] apple-shadow border-white/5 space-y-10 border">
              <div className="space-y-2">
                 <h3 className="text-2xl font-black text-white tracking-tight">Access Security</h3>
                 <p className="text-white/40 font-medium">Secure your market wallet and listings.</p>
              </div>
              <div className="flex items-center justify-between p-8 glass bg-white/[0.04] rounded-[2.5rem] border border-white/10 apple-shadow group hover:bg-white/[0.1] transition-all">
                 <div className="flex items-center gap-8">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-maize/10 text-maize border border-maize/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                       <Shield className="w-8 h-8" />
                    </div>
                    <div>
                       <div className="text-xl font-black text-white tracking-tight">Two-Factor Shards</div>
                       <p className="text-xs font-bold text-white/30 uppercase tracking-[0.1em] mt-1">Require code for high-volume trades</p>
                    </div>
                 </div>
                 <Switch checked={user?.is2FAEnabled} className="data-[state=checked]:bg-maize h-8 w-14" />
              </div>
           </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
           <Card className="glass p-10 rounded-[3rem] border-white/5 space-y-10 apple-shadow border">
              <div className="space-y-2">
                 <h3 className="text-2xl font-black text-white tracking-tight">Pulse Matrix</h3>
                 <p className="text-white/40 font-medium">Configure how you receive harvest and price telemetry.</p>
              </div>
              <div className="grid gap-6">
                 {[
                   { label: 'Market Bids', desc: 'Alerts when a buyer makes an offer on your harvest.', checked: true },
                   { label: 'Price Ticker', desc: 'Daily SMS shards with national maize prices.', checked: true },
                   { label: 'Network Relay', desc: 'Email summaries of regional market activity.', checked: false }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between p-8 glass bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.05] transition-all">
                      <div className="space-y-2">
                         <Label className="text-xl font-black text-white tracking-tight">{item.label}</Label>
                         <p className="text-xs font-bold text-white/40 max-w-sm leading-relaxed uppercase tracking-tight">{item.desc}</p>
                      </div>
                      <Switch defaultChecked={item.checked} className="data-[state=checked]:bg-maize h-7 w-12" />
                   </div>
                 ))}
              </div>
           </Card>
        </TabsContent>
        {/* Tiers Tab omitted or simplified to match TIERS if needed */}
      </Tabs>
    </div>
  );
}
