import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Inbox, 
  Search, 
  MessageSquare,
  MapPin,
  Clock,
  Trash2,
  CheckCircle2,
  ChevronRight,
  PhoneCall
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface TradeMessage {
  id: string;
  sender: string;
  type: string;
  location: string;
  preview: string;
  date: string;
  status: 'unread' | 'read' | 'urgent';
}

const MOCK_TRADE_MESSAGES: TradeMessage[] = [
  {
    id: 'TR-01',
    sender: 'Grain Millers ZIM',
    type: 'White Maize',
    location: 'Harare Hub',
    preview: 'We are interested in your 50T White Maize listing. Can we arrange transport?',
    date: '10:42 AM',
    status: 'unread'
  },
  {
    id: 'TR-02',
    sender: 'Kuda Munyaradzi',
    type: 'Yellow Maize',
    location: 'Chegutu',
    preview: 'Price confirmed at $310/t. Awaiting logisitics node confirmation.',
    date: 'Yesterday',
    status: 'read'
  },
  {
    id: 'TR-03',
    sender: 'Agro-Link Logistics',
    type: 'Transport',
    location: 'Midlands',
    preview: 'Truck available for pickup in Gweru region this Friday.',
    date: '2 days ago',
    status: 'urgent'
  }
];

export default function InboxPage() {
  const [messages, setMessages] = useState<TradeMessage[]>(MOCK_TRADE_MESSAGES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<TradeMessage | null>(null);

  const filteredMessages = messages.filter(m => 
    m.sender.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-20 px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="space-y-4">
          <span className="text-[10px] font-bold tracking-[0.4em] text-maize uppercase">Trade Communications</span>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none">Market Messages</h1>
        </div>

        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-maize transition-colors" />
          <Input 
            placeholder="Search trades..." 
            className="pl-14 h-14 glass border-white/5 rounded-2xl font-bold text-sm focus:bg-white/10 transition-all border shadow-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {filteredMessages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card 
                className={cn(
                  "glass border-white/5 overflow-hidden group cursor-pointer transition-all hover:bg-white/[0.04] apple-shadow border",
                  msg.status === 'unread' && "ring-1 ring-maize/30 bg-maize/[0.02]"
                )}
                onClick={() => setSelectedMessage(msg)}
              >
                <CardContent className="p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                  <div className="flex items-center gap-8">
                    <div className={cn(
                      "w-16 h-16 rounded-[1.8rem] flex items-center justify-center transition-all apple-shadow",
                      msg.status === 'unread' ? "bg-maize text-harvest" : "bg-white/5 text-white/40 group-hover:bg-white/10"
                    )}>
                      <MessageSquare className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                       <div className="flex items-center gap-3">
                          <h3 className="text-2xl font-black text-white tracking-tight">{msg.sender}</h3>
                          {msg.status === 'unread' && <div className="w-2.5 h-2.5 bg-maize rounded-full" />}
                          {msg.status === 'urgent' && <Badge className="bg-orange-500 text-white text-[9px]">URGENT</Badge>}
                       </div>
                       <div className="flex items-center gap-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {msg.location}</span>
                          <span className="w-1 h-1 bg-white/10 rounded-full" />
                          <span>{msg.type}</span>
                       </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full md:w-auto md:justify-end gap-10">
                     <div className="text-left md:text-right">
                        <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Last Sync</div>
                        <div className="text-sm font-bold text-white">{msg.date}</div>
                     </div>
                     <ChevronRight className="w-6 h-6 text-white/10 group-hover:text-maize group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Message Modal */}
      <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
        <DialogContent className="glass-thick border-white/10 sm:max-w-xl rounded-[4rem] p-0 overflow-hidden apple-shadow">
           <div className="p-10 space-y-10">
              <div className="w-20 h-20 bg-maize/10 rounded-[2rem] flex items-center justify-center mx-auto border border-maize/20">
                 <PhoneCall className="w-8 h-8 text-maize" />
              </div>
              <div className="text-center space-y-2">
                 <h2 className="text-3xl font-black text-white tracking-tighter">{selectedMessage?.sender}</h2>
                 <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{selectedMessage?.location} • {selectedMessage?.id}</p>
              </div>

              <div className="p-8 bg-black/40 rounded-[2.5rem] border border-white/10 text-lg font-bold text-white/90 leading-relaxed uppercase tracking-tight">
                 {selectedMessage?.preview}
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <Button variant="ghost" onClick={() => setSelectedMessage(null)} className="h-16 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-white/40 hover:bg-white/5">
                    Close
                 </Button>
                 <Button className="h-16 bg-maize text-harvest hover:bg-white rounded-2xl font-black text-[10px] uppercase tracking-widest apple-shadow">
                    Reply via USSD
                 </Button>
              </div>
           </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
