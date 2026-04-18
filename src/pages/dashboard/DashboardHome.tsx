import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  MapPin, 
  Phone, 
  Filter, 
  Search, 
  Plus, 
  TrendingUp, 
  ArrowUpRight,
  Info,
  X,
  PhoneCall,
  Terminal,
  ChevronRight,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MAIZE_LISTINGS } from '@/constants/listings';

export default function DashboardHome() {
  const [activeTab, setActiveTab] = useState<'listings' | 'ussd'>('listings');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [ussdStep, setUssdStep] = useState(0);
  const [ussdHistory, setUssdHistory] = useState<string[]>(['MaizeConnect Market\n1. Sell maize\n2. Buy maize\n3. Check prices\n4. My balance']);

  const filteredListings = MAIZE_LISTINGS.filter(item => {
    const matchesSearch = item.location.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'All' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleUssdOption = (option: string) => {
    let nextText = '';
    if (ussdStep === 0) {
      if (option === '1') nextText = 'Enter maize type:\n1. White\n2. Yellow\n3. Dry\n4. Green';
      else if (option === '2') nextText = 'Listings found in your area:\n1. 50T White ($350/t)\n2. 12T White ($355/t)\n3. Back';
      else if (option === '3') nextText = 'Market Prices (US$/T):\nWhite: $340\nYellow: $310\nDry: $325';
      else if (option === '4') nextText = 'Node Balanced:\nWallet: $24.50\nStored: 12.0T';
      setUssdStep(1);
    } else {
      nextText = 'Processing protocol link...\nConfirmation SMS sent.\n*265*98#';
      setUssdStep(0);
    }
    setUssdHistory([...ussdHistory, `> ${option}`, nextText]);
  };

  const resetUssd = () => {
    setUssdStep(0);
    setUssdHistory(['MaizeConnect Market\n1. Sell maize\n2. Buy maize\n3. Check prices\n4. My balance']);
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header Stats */}
      <section className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Market health', value: 'High', icon: <TrendingUp className="w-4 h-4" />, color: 'text-emerald' },
          { label: 'Active bids', value: '42', icon: <Phone className="w-4 h-4" />, color: 'text-maize' },
          { label: 'Avg price', value: '$335/t', icon: <Leaf className="w-4 h-4" />, color: 'text-orange-500' },
          { label: 'Nodes', value: '1.2k', icon: <MapPin className="w-4 h-4" />, color: 'text-blue-400' }
        ].map((stat, i) => (
          <Card key={i} className="glass border-white/5 apple-shadow overflow-hidden group">
            <CardContent className="p-6 relative">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                  {stat.icon}
                </div>
                <div className={cn("text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/5", stat.color)}>
                  LIVE
                </div>
              </div>
              <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">{stat.label}</div>
              <div className="text-3xl font-black text-white tracking-tighter tabular-nums">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Main Content Areas */}
      <section className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-maize transition-colors" />
              <Input 
                placeholder="Search by location or seller..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 pl-12 bg-white/[0.03] border-white/10 rounded-2xl apple-shadow focus:border-maize/50"
              />
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 apple-shadow">
                {['All', 'White Maize', 'Yellow Maize'].map(type => (
                  <button 
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                      filterType === type ? "bg-maize text-harvest shadow-lg" : "text-white/40 hover:text-white"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <Button size="icon" className="h-12 w-12 bg-harvest text-white rounded-xl apple-shadow hover:scale-105 active:scale-95">
                <Plus className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="grid gap-4">
            <AnimatePresence mode="popLayout">
              {filteredListings.map((listing, i) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="glass border-white/5 hover:border-maize/30 transition-all group cursor-pointer overflow-hidden">
                    <CardContent className="p-0 flex flex-col md:flex-row">
                      {/* Avatar Side */}
                      <div className="w-full md:w-48 bg-white/[0.02] p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-brand text-harvest text-2xl font-black flex items-center justify-center mb-4 apple-shadow group-hover:scale-110 transition-transform">
                          {listing.sellerInitials}
                        </div>
                        <span className="text-xs font-bold text-white text-center">{listing.seller}</span>
                        <div className="flex items-center gap-1 mt-2">
                           <Star className="w-3 h-3 text-maize fill-maize" />
                           <span className="text-[10px] font-black text-maize">4.9</span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="flex-grow p-8 flex flex-col justify-between">
                         <div className="flex justify-between items-start mb-6">
                            <div className="space-y-1">
                               <div className="flex items-center gap-2">
                                  <Badge className="bg-maize text-harvest font-black text-[9px] uppercase tracking-widest px-2">{listing.type}</Badge>
                                  <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">#{listing.id}</span>
                               </div>
                               <h3 className="text-2xl font-black text-white tracking-tight">{listing.quantity} Available</h3>
                               <div className="flex items-center gap-2 text-white/40">
                                  <MapPin className="w-4 h-4" />
                                  <span className="text-sm font-medium">{listing.location}</span>
                               </div>
                            </div>
                            <div className="text-right">
                               <div className="text-3xl font-black text-maize tracking-tighter tabular-nums">${listing.pricePerTon}<span className="text-xs opacity-40 ml-1">/t</span></div>
                               <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{listing.date}</div>
                            </div>
                         </div>

                         <div className="flex items-center justify-between border-t border-white/5 pt-6">
                            <div className="flex items-center gap-6">
                               <div className="flex flex-col">
                                  <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] mb-1">Stock Protocol</span>
                                  <span className="text-xs font-bold text-emerald">Verified Ingress</span>
                               </div>
                               <div className="w-px h-8 bg-white/5" />
                               <div className="flex flex-col">
                                  <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] mb-1">Status</span>
                                  <span className="text-xs font-bold text-white/60">Open Bid</span>
                               </div>
                            </div>
                            <div className="flex gap-2">
                               <Button variant="ghost" size="sm" className="rounded-xl hover:bg-white/5 text-white h-10 px-4">
                                  Details
                                </Button>
                               <Button size="sm" className="bg-maize text-harvest hover:bg-maize/90 h-10 px-6 rounded-xl font-bold uppercase text-[10px] tracking-widest">
                                  Contact via USSD
                               </Button>
                            </div>
                         </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
           {/* USSD Simulator Preview */}
           <Card className="bg-harvest border-maize/20 apple-shadow overflow-hidden group relative">
              <div className="absolute inset-0 grain-overlay opacity-20 pointer-events-none" />
              <CardContent className="p-8 space-y-6 relative z-10">
                 <div className="flex justify-between items-center mb-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                       <Terminal className="w-6 h-6 text-maize" />
                    </div>
                    <Badge className="bg-maize/20 text-maize border-maize/30">Protocol Demo</Badge>
                 </div>
                 
                 <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white tracking-tighter">USSD Simulator</h3>
                    <p className="text-white/60 text-sm font-medium leading-relaxed">Experience MaizeConnect as a rural farmer using our USSD protocol dialer.</p>
                 </div>

                 <div className="p-4 bg-black/40 rounded-2xl border border-white/10 font-mono text-[11px] text-emerald leading-relaxed h-[180px] overflow-y-auto custom-scrollbar">
                    {ussdHistory.map((line, i) => (
                      <div key={i} className="mb-2 whitespace-pre-wrap">{line}</div>
                    ))}
                    <motion.div animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="inline-block w-2 h-4 bg-emerald ml-1" />
                 </div>

                 <div className="grid grid-cols-4 gap-2">
                    {['1', '2', '3', '4', '5', '#', '0', '*'].map(key => (
                      <button 
                        key={key} 
                        onClick={() => handleUssdOption(key)}
                        className="h-10 rounded-lg bg-white/5 border border-white/10 text-white font-bold hover:bg-maize hover:text-harvest transition-all active:scale-95"
                      >
                        {key}
                      </button>
                    ))}
                 </div>
                 
                 <Button onClick={resetUssd} variant="ghost" className="w-full text-white/40 hover:text-white hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest h-10">
                    Reset Session
                 </Button>
              </CardContent>
           </Card>

           {/* Market Announcement */}
           <Card className="glass border-white/5 apple-shadow overflow-hidden">
              <CardContent className="p-8 space-y-6">
                 <div className="w-12 h-12 bg-emerald/10 text-emerald rounded-2xl flex items-center justify-center border border-emerald/20">
                    <Info className="w-6 h-6" />
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-lg font-black text-white tracking-tight">Node Announcement</h4>
                    <p className="text-xs text-white/40 leading-relaxed font-medium">Zimbabwe's Strategic Reserve has announced new floor prices for White Maize starting next week. Update your bids accordingly.</p>
                 </div>
                 <Button variant="link" className="text-emerald p-0 h-auto text-[10px] font-bold uppercase tracking-[0.2em] hover:text-white transition-colors">
                    View Bulletin <ChevronRight className="w-3 h-3 ml-1" />
                 </Button>
              </CardContent>
           </Card>
        </div>
      </section>

      {/* Ticker Bottom (Mobile specialized) */}
      <div className="fixed bottom-0 left-0 right-0 bg-harvest/80 backdrop-blur-xl border-t border-white/10 h-16 z-40 flex items-center px-8 lg:hidden">
         <div className="flex-grow flex items-center gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <Badge className="bg-maize text-harvest font-black">BULLETIN</Badge>
            <span className="text-[10px] font-black text-white uppercase tracking-widest">HARARE: WHITE MAIZE STEADY AT $355/T • BULAWAYO DEMAND UP +12% • GWERU NODE ONLINE</span>
         </div>
      </div>
    </div>
  );
}

const cn = (...args: any[]) => args.filter(Boolean).join(' ');
