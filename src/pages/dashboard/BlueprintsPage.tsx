import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  MapPin, 
  Shield, 
  TrendingUp, 
  Loader2, 
  FileText,
  Sparkles,
  CloudRain,
  Sun,
  Layout
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
import { GeminiService } from '@/services/geminiService';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';

export default function BlueprintsPage() {
  const [type, setType] = useState('Crop Planning');
  const [goal, setGoal] = useState('');
  const [constraints, setConstraints] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [blueprint, setBlueprint] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!goal) {
      toast.error('Please define your agricultural objective');
      return;
    }

    setIsGenerating(true);
    setBlueprint(null);
    try {
      // Repurposing logic for agricultural context
      const agriculturalGoal = `As a Zimbabwean farmer focusing on ${type}, my objective is: ${goal}. Constraints: ${constraints}`;
      const result = await GeminiService.generateBlueprint(type, agriculturalGoal, constraints);
      setBlueprint(result);
      toast.success('Agricultural strategy generated');
    } catch (error) {
      toast.error('Strategic analysis failed. Please retry.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-20 px-4">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maize/10 border border-maize/20 border">
          <Sparkles className="w-3 h-3 text-maize" />
          <span className="text-[9px] font-bold text-maize uppercase tracking-widest">AI Strategic Counsel</span>
        </div>
        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none">Market Resources</h1>
        <p className="text-lg text-white/40 font-medium">Generate agricultural strategies, yield forecasts, and weather-risk plans.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10">
        <div className="space-y-8">
          <Card className="glass border-white/5 rounded-[3rem] p-10 apple-shadow border">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-[10px] font-bold text-maize uppercase tracking-[0.2em] ml-1">Strategy Domain</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="h-14 bg-white/[0.03] border-white/5 rounded-2xl font-bold text-[12px] uppercase tracking-widest text-white px-6">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-thick border-white/10 rounded-2xl p-2 bg-harvest">
                      <SelectItem value="Crop Planning" className="rounded-xl focus:bg-white/10 h-11">
                        <div className="flex items-center gap-3">
                          <Leaf className="w-4 h-4 text-maize" />
                          <span className="font-bold text-xs uppercase tracking-widest">Crop Planning</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Logistics" className="rounded-xl focus:bg-white/10 h-11">
                        <div className="flex items-center gap-3">
                          <TrendingUp className="w-4 h-4 text-emerald" />
                          <span className="font-bold text-xs uppercase tracking-widest">Market Logistics</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Risk Mitigation" className="rounded-xl focus:bg-white/10 h-11">
                        <div className="flex items-center gap-3">
                          <Shield className="w-4 h-4 text-orange-400" />
                          <span className="font-bold text-xs uppercase tracking-widest">Weather/Risk</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-bold text-maize uppercase tracking-[0.2em] ml-1">Objective</Label>
                  <Input 
                    placeholder="e.g. Optimize 50h maize yield..." 
                    className="h-14 bg-white/[0.03] border-white/5 rounded-2xl focus:bg-white/10 transition-all text-sm font-medium text-white px-6"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-bold text-maize uppercase tracking-[0.2em] ml-1">Factors (Soil, Region, Capital)</Label>
                  <Textarea 
                    placeholder="e.g. Mashonaland West, Sandy soil, $5k capital..." 
                    className="min-h-[160px] bg-white/[0.03] border-white/5 rounded-[2rem] focus:bg-white/10 transition-all text-sm font-medium p-6 resize-none text-white"
                    value={constraints}
                    onChange={(e) => setConstraints(e.target.value)}
                  />
                </div>
              </div>

              <Button 
                className="w-full h-20 bg-maize text-harvest hover:bg-white rounded-[2.2rem] text-sm font-black uppercase tracking-[0.2em] apple-shadow transform active:scale-[0.98] transition-all group" 
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <Loader2 className="w-6 h-6 animate-spin mr-3" />
                ) : (
                  <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                )}
                <span>{isGenerating ? 'Analyzing soil & sky...' : 'Generate Harvest Plan'}</span>
              </Button>
            </div>
          </Card>

          <div className="p-8 bg-harvest rounded-[2.5rem] border border-maize/10 space-y-4 apple-shadow relative overflow-hidden">
             <div className="absolute inset-0 grain-overlay opacity-10" />
             <div className="flex items-center gap-4 relative z-10">
               <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                 <CloudRain className="w-5 h-5 text-maize" />
               </div>
               <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Regional Forecast</span>
             </div>
             <p className="text-[11px] text-white/40 leading-relaxed font-black uppercase tracking-widest relative z-10">
               Market resource nodes are updated daily with regional climate data from Zim-MET services.
             </p>
          </div>
        </div>

        <div className="min-h-[600px] relative">
          <AnimatePresence mode="wait">
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center space-y-12 glass rounded-[4rem] border border-maize/20 apple-shadow"
              >
                 <div className="w-32 h-32 rounded-[3.5rem] bg-maize/5 flex items-center justify-center relative overflow-hidden border border-maize/20">
                    <Leaf className="w-12 h-12 text-maize animate-pulse" />
                    <motion.div 
                      animate={{ y: [-120, 120] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="absolute inset-x-0 h-8 bg-maize/20 blur-xl"
                    />
                 </div>
                 <div className="text-center space-y-4">
                    <h3 className="text-3xl font-black text-white tracking-tighter">Synthesizing Strategy</h3>
                    <p className="text-[10px] font-bold text-maize uppercase tracking-[0.4em] animate-pulse">Calculating yield horizons...</p>
                 </div>
              </motion.div>
            )}

            {blueprint ? (
              <motion.div
                key="blueprint"
                initial={{ opacity: 0, scale: 0.98, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="h-full"
              >
                <Card className="glass border-white/5 rounded-[4rem] h-full flex flex-col apple-shadow overflow-hidden group border">
                  <div className="p-10 border-b border-white/5 flex flex-row items-center justify-between bg-white/[0.02]">
                    <div>
                      <h3 className="text-3xl font-black text-white tracking-tighter">Agricultural Blueprint</h3>
                      <div className="flex items-center gap-4 mt-2">
                         <span className="text-[10px] text-maize font-black uppercase tracking-widest font-mono">Harvest Protocol v1.2</span>
                      </div>
                    </div>
                    <Button variant="ghost" className="text-white/40 hover:text-white uppercase tracking-widest text-[10px] font-bold" onClick={() => setBlueprint(null)}>
                      Close Plan
                    </Button>
                  </div>
                  <CardContent className="p-12 flex-grow overflow-y-auto custom-scrollbar bg-black/40">
                    <div className="prose prose-invert max-w-none selection:bg-maize/40">
                       <ReactMarkdown>{blueprint}</ReactMarkdown>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              !isGenerating && (
                <div className="h-full border border-white/5 rounded-[4rem] flex flex-col items-center justify-center text-center p-24 bg-white/[0.01] apple-shadow relative group overflow-hidden">
                   <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-maize/5 to-transparent opacity-50" />
                   <div className="w-32 h-32 rounded-[3.5rem] bg-white/[0.02] flex items-center justify-center mb-10 apple-shadow border border-white/5 transition-transform group-hover:scale-110">
                      <Layout className="w-12 h-12 text-white/10" />
                   </div>
                   <div className="space-y-6 relative z-10">
                      <h3 className="text-4xl font-black text-white tracking-tighter leading-none">Resource Engine Ready.</h3>
                      <p className="text-white/40 max-w-sm text-lg font-bold leading-relaxed">
                        Input your soil, region, and objective to generate a specialized agricultural strategy blueprint.
                      </p>
                   </div>
                </div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
