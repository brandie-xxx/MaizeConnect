import { motion } from 'motion/react';
import { 
  Leaf, 
  MapPin, 
  Phone, 
  Globe, 
  CheckCircle2, 
  Users, 
  ShieldCheck, 
  ArrowLeft,
  Target,
  Rocket,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDFEFC] text-[#1D1D1F] font-sans selection:bg-harvest/20 selection:text-harvest overflow-x-hidden relative">
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      {/* Navigation */}
      <nav className="sticky top-0 w-full z-[101] border-b border-[#1D1D1F]/5 bg-white/70 backdrop-blur-2xl px-8 h-20">
        <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-maize rounded-xl flex items-center justify-center shadow-lg shadow-maize/20 rotate-[-4deg] group-hover:rotate-0 transition-transform">
              <Leaf className="w-6 h-6 text-harvest" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-[#1D1D1F] leading-none">MaizeConnect</span>
              <span className="text-[12px] font-bold text-harvest/80">Zimbabwe marketplace</span>
            </div>
          </Link>

          <Link to="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-2 font-display text-[12px] font-bold group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="px-8 pt-24 pb-32 bg-gradient-to-b from-[#F2F7F2] to-white relative overflow-hidden">
        {/* Subtle Brand Background */}
        <div className="absolute inset-x-0 top-0 h-full z-0 opacity-[0.15]">
          <img 
            src="https://picsum.photos/seed/agricultural_innovation/1920/1080"
            alt=""
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F2F7F2] to-white" />
        </div>
        <div className="max-w-[1000px] mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-harvest/10 text-harvest text-[13px] font-bold border border-harvest/10"
          >
            Our mission
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl lg:text-8xl font-black text-[#1D1D1F] tracking-tight leading-[0.9]"
          >
            Connecting the grain <br />
            <span className="text-harvest">ecosystem.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-[#1D1D1F]/85 font-medium max-w-2xl mx-auto leading-relaxed font-sans"
          >
            MaizeConnect is more than a marketplace. We are building the high-fidelity digital infrastructure needed to eliminate information asymmetry for Zimbabwean farmers.
          </motion.p>
        </div>

        {/* Floating background elements */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-maize/10 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-harvest/5 rounded-full blur-[120px]" />
      </header>

      {/* The Vision Section */}
      <section className="px-8 py-32">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <h2 className="text-5xl font-black text-[#1D1D1F] tracking-tight">Bridging the gap with simplicity.</h2>
              <p className="text-xl text-[#1D1D1F]/85 font-medium leading-relaxed font-sans">
                For decades, smallholder farmers in rural Zimbabwe have faced a critical barrier: lack of real-time market data. Without internet access or transparent pricing, they were often forced to accept below-market rates for their yields.
              </p>
              <p className="text-xl text-[#1D1D1F]/85 font-medium leading-relaxed font-sans">
                MaizeConnect solves this using USSD technology. By stripping away the need for smartphones and data plans, we provide an inclusive gateway that works on any basic mobile device, even in the most remote regions.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { icon: <Target className="w-5 h-5" />, title: "Market Transparency", text: "Verified daily prices from national millers." },
                { icon: <Rocket className="w-5 h-5" />, title: "USSD Core", title_sn: "USSD Tekinoroji", text: "Offline-first protocol designed for 2G networks." },
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-[2rem] bg-[#FAFAF9] border border-[#1D1D1F]/5 space-y-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-black/5 text-harvest">
                    {item.icon}
                  </div>
                  <h4 className="font-black text-[#1D1D1F] text-xl">{item.title}</h4>
                  <p className="text-base text-[#1D1D1F]/75 font-medium leading-relaxed font-sans">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-square bg-harvest rounded-[4rem] overflow-hidden shadow-2xl relative">
                <img 
                    src="https://images.unsplash.com/photo-1594488310342-99889419207e?auto=format&fit=crop&q=80&w=2000" 
                    alt="Zimbabwean Farm Worker" 
                    className="w-full h-full object-cover mix-blend-multiply opacity-80"
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-harvest/40 to-transparent" />
                
                <div className="absolute inset-x-12 bottom-12 p-10 bg-white backdrop-blur-3xl rounded-[3rem] shadow-2xl space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-[14px] font-bold text-[#1D1D1F]/60">Farmer centric</span>
                    </div>
                    <blockquote className="text-2xl font-black text-[#1D1D1F] leading-tight block">
                      "Finally, a system that speaks our language and works on the phones we actually use."
                    </blockquote>
                    <cite className="text-sm font-bold text-harvest not-italic">— Tinashe M., Mashonaland West farmer</cite>
                </div>
            </div>
            {/* Visual background decoration */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-maize border-8 border-white rounded-full shadow-2xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Core Values / Pillar Section */}
      <section className="px-8 py-32 bg-[#1D1D1F] text-white rounded-[4rem] mx-4 relative overflow-hidden">
        {/* Dark Mode Visual Backdrop */}
        <div className="absolute inset-0 z-0 opacity-[0.13]">
          <img 
            src="https://picsum.photos/seed/harvest_texture/1920/1080"
            alt=""
            className="w-full h-full object-cover grayscale brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1 space-y-8">
              <h2 className="text-6xl font-black tracking-tight leading-[0.9]">The pillars of MaizeConnect.</h2>
              <p className="text-xl text-white/70 font-medium leading-relaxed font-sans">
                Our platform is built on fundamental values that guide every update and feature we roll out across Zimbabwe.
              </p>
            </div>

            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              {[
                { 
                  icon: <Users className="w-6 h-6" />, 
                  title: "Inclusivity", 
                  desc: "We don't build for the few. We build for the millions who rely on basic mobile hardware. Technology is only useful if it's reachable." 
                },
                { 
                  icon: <ShieldCheck className="w-6 h-6" />, 
                  title: "Integrity", 
                  desc: "Every price on our platform is verified. Every handler is tracked. We provide the security that builds trust in local trade." 
                },
                { 
                  icon: <Globe className="w-6 h-6" />, 
                  title: "Resilience", 
                  desc: "Grain trade never stops, even when the internet does. Our system is designed to be fully operational without broadband connectivity." 
                },
                { 
                  icon: <MapPin className="w-6 h-6" />, 
                  title: "Precision", 
                  desc: "We map supply and demand down to the village level, ensuring that logistics are optimized and waste is minimized." 
                }
              ].map((pillar, i) => (
                <div key={i} className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                  <div className="w-14 h-14 bg-maize rounded-2xl flex items-center justify-center text-harvest mb-8 group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                  <h3 className="text-3xl font-black mb-4">{pillar.title}</h3>
                  <p className="text-lg text-white/60 font-medium leading-relaxed font-sans">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Animated background circles */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-harvest opacity-10 blur-[150px]" />
      </section>

      {/* New Technology Deep Dive Section */}
      <section className="px-8 py-32 bg-[#F9FAF9] relative overflow-hidden">
        {/* Technology Substratum */}
        <div className="absolute inset-0 z-0 opacity-[0.13]">
          <img 
            src="https://picsum.photos/seed/circuit_pattern/1920/1080"
            alt=""
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-24 items-center relative z-10">
          <div className="order-2 lg:order-1 relative h-[600px] bg-white rounded-[3rem] border border-[#1D1D1F]/5 shadow-2xl overflow-hidden flex items-center justify-center p-12">
             <div className="space-y-12 w-full max-w-sm">
                <div className="space-y-4 text-center">
                   <div className="mx-auto w-16 h-16 bg-harvest/10 rounded-2xl flex items-center justify-center">
                      <Phone className="w-8 h-8 text-harvest" />
                   </div>
                   <h3 className="text-4xl font-black text-[#1D1D1F]">The USSD advantage.</h3>
                   <p className="text-xl text-[#1D1D1F]/70 font-medium font-sans leading-relaxed">
                      Optimized for speed, security, and absolute accessibility.
                   </p>
                </div>
                
                <div className="space-y-6">
                    {[
                      { l: "Protocol", v: "GSM Phase 2+" },
                      { l: "Latency", v: "< 200ms" },
                      { l: "Availability", v: "99.99% Node Uptime" },
                      { l: "Compression", v: "High-Fidelity Packetizing" }
                    ].map(item => (
                      <div key={item.l} className="flex items-center justify-between border-b border-[#1D1D1F]/10 pb-4">
                        <span className="text-sm font-bold text-[#1D1D1F]/50">{item.l}</span>
                        <span className="text-base font-black text-harvest">{item.v}</span>
                      </div>
                    ))}
                </div>
             </div>
          </div>

          <div className="order-1 lg:order-2 space-y-10">
            <div className="space-y-6">
              <span className="text-sm font-bold text-harvest/80">Our technology stack</span>
              <h2 className="text-5xl font-black text-[#1D1D1F] tracking-tight leading-tight">Built for rural <br />resilience.</h2>
              <p className="text-xl text-[#1D1D1F]/85 font-medium leading-relaxed font-sans">
                While much of the world moves toward data-heavy applications, MaizeConnect intentionally optimizes for the 2G and 3G networks that blanket Zimbabwe. 
              </p>
              <p className="text-xl text-[#1D1D1F]/85 font-medium leading-relaxed font-sans">
                Our USSD engine uses advanced packet compression to ensure that complex market transactions are completed in milliseconds, even on legacy mobile hardware.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="px-8 py-32">
        <div className="max-w-[1400px] mx-auto">
           <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-10">
                 <div className="space-y-6">
                    <h2 className="text-5xl font-black text-[#1D1D1F] tracking-tight">An ecosystem for millers and farmers.</h2>
                    <p className="text-xl text-[#1D1D1F]/80 font-medium leading-relaxed font-sans">
                       We aren't just serving one side of the trade. Our platform creates a synchronous link between the rural farmer and the urban miller, smoothing out the supply chain and reducing the cost of logistics.
                    </p>
                 </div>
                 
                 <div className="space-y-6">
                    {[
                      { h: "For farmers", p: "Access to daily national prices, early buyer matching, and secure logistical support." },
                      { h: "For millers", p: "Direct access to high-fidelity yield data from across the provinces, resulting in better procurement planning." }
                    ].map(item => (
                      <div key={item.h} className="p-8 rounded-[2rem] bg-[#FDFEFC] border border-[#1D1D1F]/10 space-y-2">
                        <h4 className="text-2xl font-black text-[#1D1D1F]">{item.h}</h4>
                        <p className="text-lg text-[#1D1D1F]/65 font-medium font-sans leading-relaxed">{item.p}</p>
                      </div>
                    ))}
                 </div>
              </div>
              
              <div className="relative aspect-[4/5] bg-[#EBF2EA] rounded-[4rem] border border-[#1D1D1F]/5 overflow-hidden shadow-2xl">
                 <img 
                    src="https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=2000" 
                    alt="Zimbabwe Harvest" 
                    className="w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-x-10 bottom-10 p-10 bg-white/80 backdrop-blur-3xl rounded-[3rem] shadow-2xl border border-white/40">
                    <span className="text-[12px] font-bold text-harvest block mb-2">Platform coverage</span>
                    <p className="text-xl font-black text-[#1D1D1F] leading-tight">
                       "MaizeConnect has transformed our procurement cycle. We now have real visibility into the harvest."
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Impact stats again with detail */}
      <section className="px-8 py-32">
        <div className="max-w-[1400px] mx-auto space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-6xl font-black tracking-tight">Our scale in 2026.</h2>
            <p className="text-xl text-[#1D1D1F]/65 font-medium max-w-2xl mx-auto font-sans">
              Data-driven results that prove our impact on the national agricultural economy of Zimbabwe.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: "Active farmers", value: "250K+" },
              { label: "Market volume", value: "1.4M t" },
              { label: "Price reliability", value: "99.2%" },
              { label: "Network regions", value: "10/10" }
            ].map((stat, i) => (
              <div key={i} className="p-12 bg-white rounded-[3rem] border border-[#1D1D1F]/10 shadow-xl shadow-black/5 text-center space-y-2">
                <div className="text-5xl font-black text-[#1D1D1F] tracking-tighter">{stat.value}</div>
                <div className="text-sm font-bold text-harvest/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-32 bg-maize/10 mx-4 rounded-[4rem] mb-32 relative overflow-hidden">
        <div className="max-w-[1000px] mx-auto text-center space-y-12 relative z-10">
          <div className="w-20 h-20 bg-harvest rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-harvest/30 rotate-12">
            <Phone className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-6xl font-black text-[#1D1D1F] tracking-tight">Ready to join the network?</h2>
          <p className="text-2xl text-[#1D1D1F]/80 font-medium leading-relaxed font-sans">
            Whether you are a local farmer or a national grain miller, MaizeConnect is ready for you. Dial our portal to get started today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="p-1.5 bg-white rounded-[2.5rem] border border-[#1D1D1F]/10 shadow-xl flex items-center gap-6 pr-10">
              <div className="w-16 h-16 bg-[#1D1D1F] rounded-3xl flex items-center justify-center text-white">
                <Leaf className="w-8 h-8" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-[#1D1D1F]/60 text-left">The dial code</div>
                <div className="text-3xl font-black text-[#1D1D1F] tracking-tighter">*265*98#</div>
              </div>
            </div>
            <Link to="/">
               <Button size="lg" className="h-[74px] bg-harvest text-white rounded-[2.5rem] px-12 font-bold text-base hover:-translate-y-1.5 transition-transform active:scale-95 shadow-2xl shadow-harvest/30">
                 Explore marketplace
               </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-24 border-t border-[#1D1D1F]/5 bg-[#FAFAF9]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-2xl font-black tracking-tighter text-[#1D1D1F]">MaizeConnect</span>
            <span className="text-sm font-bold text-[#1D1D1F]/70">Digital grain backbone</span>
          </div>
          <div className="flex gap-8">
            <Link to="/" className="text-sm font-bold text-[#1D1D1F]/60 hover:text-harvest transition-colors">Home</Link>
            <span className="text-sm font-bold text-harvest underline underline-offset-8 decoration-2">About</span>
            <a href="#" className="text-sm font-bold text-[#1D1D1F]/60 hover:text-harvest transition-colors">How it works</a>
            <a href="#" className="text-sm font-bold text-[#1D1D1F]/60 hover:text-harvest transition-colors">Logistics</a>
          </div>
          <div className="text-[13px] font-bold text-[#1D1D1F]/50">
            © 2026 MaizeConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
