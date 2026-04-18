import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Leaf, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Plus,
  Loader2,
  PhoneCall,
  Navigation
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function ComposePage() {
  const [isListing, setIsListing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    type: 'White Maize',
    quantity: '',
    location: '',
    price: '',
    notes: ''
  });

  const handleListHarvest = async () => {
    if (!formData.quantity || !formData.location) {
      toast.error('Please specify harvest quantity and location.');
      return;
    }

    setIsListing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowSuccess(true);
      toast.success('Harvest entry successfully listed on the marketplace.');
    } catch (error) {
      toast.error('Network sync failure. Please retry.');
    } finally {
      setIsListing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20 px-4">
      <div className="space-y-4">
        <span className="text-[10px] font-bold tracking-[0.4em] text-maize uppercase">Harvest Protocol</span>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">List your maize harvest</h1>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-12">
        <div className="space-y-10">
          <Card className="glass p-10 rounded-[3rem] apple-shadow border-white/5 space-y-10 border">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Crop Variety</Label>
                <Select value={formData.type} onValueChange={(v) => setFormData({...formData, type: v})}>
                  <SelectTrigger className="h-14 glass border-white/5 rounded-2xl font-black text-[12px] uppercase tracking-widest px-6 shadow-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-thick border-white/10 rounded-2xl">
                    {['White Maize', 'Yellow Maize', 'Dry Maize', 'Green Maize'].map(type => (
                      <SelectItem key={type} value={type} className="focus:bg-maize/20 transition-colors py-4">
                        <span className="font-black text-xs uppercase tracking-widest">{type}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Quantity (Tons/Bags)</Label>
                <Input 
                  placeholder="e.g. 50 Tons" 
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  className="h-14 glass border-white/5 rounded-2xl px-6 font-bold text-white text-lg placeholder:text-white/20 focus:bg-white/10"
                />
              </div>
            </div>

            <div className="space-y-4">
               <Label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Pickup Location / Province</Label>
               <div className="relative">
                  <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-maize opacity-60" />
                  <Input 
                    placeholder="e.g. Mashonaland West, Chegutu" 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="h-14 pl-14 glass border-white/5 rounded-2xl font-bold text-white text-lg placeholder:text-white/20"
                  />
               </div>
            </div>

            <div className="space-y-4">
               <Label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Price per Ton (US$)</Label>
               <div className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-maize opacity-60 tracking-widest">$</div>
                  <Input 
                    type="number"
                    placeholder="350" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="h-14 pl-12 glass border-white/5 rounded-2xl font-bold text-white text-lg placeholder:text-white/20"
                  />
               </div>
            </div>

            <div className="space-y-4">
               <Label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Additional Notes</Label>
               <Textarea 
                placeholder="Details on moisture content, storage, or transport availability..." 
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="min-h-[160px] glass border-white/5 rounded-[2.5rem] p-8 text-lg font-medium resize-none focus:bg-white/10"
               />
            </div>

            <div className="pt-6">
              <Button 
                className="w-full h-20 bg-maize text-harvest hover:bg-white hover:text-harvest rounded-[2rem] text-sm font-black uppercase tracking-[0.3em] apple-shadow transform active:scale-[0.98] transition-all group overflow-hidden relative"
                onClick={handleListHarvest}
                disabled={isListing}
              >
                {isListing ? (
                  <Loader2 className="w-6 h-6 animate-spin mr-4" />
                ) : (
                  <Leaf className="w-6 h-6 mr-4 group-hover:rotate-12 transition-transform relative z-10" />
                )}
                <span className="relative z-10">{isListing ? 'Syncing Market Node...' : 'List Harvest Entry'}</span>
                {isListing && (
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute inset-0 bg-white/20"
                  />
                )}
              </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-10">
          <div className="glass p-10 rounded-[3rem] border-white/5 space-y-8 apple-shadow">
             <div className="w-12 h-12 bg-maize/10 text-maize rounded-2xl flex items-center justify-center border border-maize/20">
                <PhoneCall className="w-6 h-6" />
             </div>
             <div className="space-y-4">
                <h4 className="text-sm font-black text-white uppercase tracking-widest">Also available via USSD</h4>
                <p className="text-xs font-medium text-white/40 leading-relaxed">
                  You can list your harvest without data. Simply dial <span className="text-maize font-bold">*265*98#</span> from any mobile phone in Zimbabwe.
                </p>
             </div>
             <div className="h-px bg-white/5" />
             <div className="space-y-2">
                <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">Regional Hubs</div>
                <div className="flex flex-wrap gap-2 pt-2">
                   {['Harare', 'Mash West', 'Bulawayo', 'Midlands'].map(t => (
                     <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold uppercase tracking-widest text-white/50">{t}</span>
                   ))}
                </div>
             </div>
          </div>

          <div className="p-10 bg-harvest rounded-[3rem] border border-maize/20 apple-shadow space-y-6 relative overflow-hidden group">
             <div className="absolute inset-0 grain-overlay opacity-20" />
             <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 group-hover:rotate-12 transition-all">
                <Navigation className="w-6 h-6 text-white" />
             </div>
             <div className="space-y-2 relative z-10">
                <h4 className="text-lg font-black text-white tracking-tight">Visibility Policy</h4>
                <p className="text-xs font-bold text-white/60 leading-relaxed">
                  Your listing will be broadcasted to verified millers and aggregators across Zimbabwe.
                </p>
             </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="glass-thick border-white/10 sm:max-w-xl rounded-[4rem] p-0 overflow-hidden apple-shadow">
           <div className="p-12 text-center space-y-12">
              <div className="w-24 h-24 bg-maize/10 rounded-[2.5rem] flex items-center justify-center mx-auto border border-maize/20 apple-shadow">
                 <CheckCircle2 className="w-12 h-12 text-maize" />
              </div>
              <div className="space-y-4">
                 <DialogHeader>
                    <DialogTitle className="text-4xl font-black text-center text-white tracking-tighter">Listing active.</DialogTitle>
                    <DialogDescription className="text-lg font-medium text-white/40 pt-4 px-8 leading-relaxed">
                      Your {formData.quantity} of {formData.type} is now visible to buyers in {formData.location}.
                    </DialogDescription>
                 </DialogHeader>
              </div>
              <Button 
                onClick={() => setShowSuccess(false)}
                className="w-full h-20 bg-maize text-harvest hover:bg-white rounded-[2rem] font-bold text-xs uppercase tracking-[0.3em] apple-shadow"
              >
                Back to Market
              </Button>
           </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
