import { useRef, useState } from 'react';
import { motion, useScroll } from 'motion/react';
import { 
  Leaf, 
  MapPin, 
  Phone, 
  Globe, 
  TrendingUp,
  Navigation,
  CheckCircle2,
  Users,
  Briefcase,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lang, setLang] = useState<'EN' | 'SN'>('EN');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: lang === 'EN' ? 'How it works' : 'Zvinoshanda sei', href: '#how' },
    { name: lang === 'EN' ? 'Impact' : 'Simba redu', href: '#impact' },
    { name: lang === 'EN' ? 'About us' : 'Nezve isu', href: '/about', isLink: true },
  ];

  const marketPrices = [
    { type: 'White Maize', price: '$340/t', trend: '+2%' },
    { type: 'Yellow Maize', price: '$310/t', trend: '-1%' },
    { type: 'Dry Maize', price: '$325/t', trend: '+0.5%' },
    { type: 'Green Maize', price: '$2/doz', trend: '0%' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-[#D8E2D8] via-[#F0F5EF] to-[#CFDCCF] text-[#1D1D1F] overflow-x-hidden selection:bg-harvest/20 selection:text-harvest scroll-smooth font-sans relative">
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      {/* Navigation */}
      <nav className="sticky top-0 w-full z-[101] border-b border-[#1D1D1F]/5 bg-white/60 backdrop-blur-2xl px-4 md:px-6 lg:px-8 h-16 md:h-20">
        <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-maize rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-maize/20 rotate-[-4deg]">
              <Leaf className="w-5 h-5 md:w-6 md:h-6 text-harvest" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-black tracking-tighter text-[#1D1D1F] leading-none">MaizeConnect</span>
              <span className="text-[10px] md:text-[12px] font-bold text-harvest/80 hidden sm:block">Zimbabwe marketplace</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              link.isLink ? (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className="text-[15px] font-bold text-[#1D1D1F]/80 hover:text-harvest transition-all font-display hover:-translate-y-0.5"
                >
                  {link.name}
                </Link>
              ) : (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-[15px] font-bold text-[#1D1D1F]/80 hover:text-harvest transition-all font-display hover:-translate-y-0.5"
                >
                  {link.name}
                </a>
              )
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setLang(lang === 'EN' ? 'SN' : 'EN')}
              className="flex items-center gap-2 group"
            >
              <Globe className="w-5 h-5 text-[#1D1D1F]/40 group-hover:text-harvest transition-colors" />
              <span className="text-[14px] font-bold text-[#1D1D1F]/70 group-hover:text-harvest transition-colors">{lang === 'EN' ? 'English / Shona' : 'Shona / English'}</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 md:gap-3 bg-harvest/5 px-3 md:px-4 py-1.5 md:py-2 rounded-xl border border-harvest/10">
              <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-harvest" />
              <span className="text-[11px] md:text-[12px] font-black tracking-tight text-harvest">*265*98#</span>
            </div>
            <button
              className="md:hidden p-2 rounded-xl hover:bg-[#1D1D1F]/5 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-[#1D1D1F]/5 px-4 py-4 space-y-3 shadow-xl"
          >
            {navLinks.map((link) => (
              link.isLink ? (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-[15px] font-bold text-[#1D1D1F]/80 hover:text-harvest transition-all py-2"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-[15px] font-bold text-[#1D1D1F]/80 hover:text-harvest transition-all py-2"
                >
                  {link.name}
                </a>
              )
            ))}
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="about" className="relative px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-16 sm:pb-24 md:pb-32 lg:pb-48 overflow-hidden">
        {/* Architectural Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/maize_farm_sunlight/1920/1080"
            alt=""
            className="w-full h-full object-cover opacity-[0.15] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        </div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="space-y-12"
          >
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[90px] font-black text-[#1D1D1F] leading-[0.9] md:leading-[0.85] tracking-[-0.05em]"
            >
              {lang === 'EN' ? 'The harvest' : 'Kukohwa'}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-harvest via-harvest/80 to-maize/80">{lang === 'EN' ? 'marketplace.' : 'musika.'}</span>
            </motion.h1>

            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#1D1D1F]/85 font-medium leading-relaxed max-w-lg font-sans"
            >
              {lang === 'EN' 
                ? 'Empowering Zimbabwean farmers with high-fidelity, USSD-driven market intelligence.'
                : 'Kupa varimi vemuZimbabwe simba neruzivo rwemusika kuburikidza neUSSD.'}
            </motion.p>

            <motion.div 
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 }
              }}
              className="flex flex-col sm:flex-row items-center gap-8 pt-8"
            >
              <a href="#how" className="w-full sm:w-auto">
                <Button size="lg" className="w-full h-14 md:h-16 lg:h-20 bg-harvest text-white hover:bg-harvest/95 font-bold text-sm md:text-base px-6 md:px-10 lg:px-14 rounded-2xl lg:rounded-[2rem] shadow-2xl shadow-harvest/30 transition-all hover:-translate-y-1.5 hover:shadow-harvest/40 active:scale-95">
                  {lang === 'EN' ? 'Explore ecosystem' : 'Ona zvakawanda'}
                </Button>
              </a>
              <div className="flex items-center gap-3 md:gap-5 lg:gap-7 p-1.5 bg-white/40 backdrop-blur-xl rounded-2xl lg:rounded-[2.5rem] border border-[#1D1D1F]/10 shadow-2xl shadow-black/5 pr-6 lg:pr-10">
                <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-maize rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-2xl shadow-maize/40">
                  <Phone className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-harvest" />
                </div>
                <div>
                  <div className="text-[11px] md:text-[12px] lg:text-[13px] font-bold text-[#1D1D1F]/70">USSD portal</div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-black text-[#1D1D1F] tracking-tighter">*265*98#</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative z-10 aspect-[4/5] sm:aspect-[3/4] lg:aspect-square bg-white rounded-3xl lg:rounded-[4rem] shadow-2xl overflow-hidden border border-[#1D1D1F]/5">
              <img 
                src="https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=2000" 
                alt="Agricultural Landscape" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 md:bottom-8 md:left-8 md:right-8 lg:bottom-12 lg:left-12 lg:right-12 p-4 sm:p-6 md:p-8 lg:p-10 bg-white shadow-2xl border border-white/40 rounded-2xl lg:rounded-[3rem]">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="text-[14px] font-bold text-harvest">Market depth</span>
                        <div className="px-3 py-1 bg-harvest/10 rounded-full text-[11px] font-bold text-harvest">Live</div>
                    </div>
                    <div className="grid grid-cols-2 gap-10">
                        <div>
                            <div className="text-[13px] font-bold text-[#1D1D1F]/80 mb-2">Total yield</div>
                            <div className="text-4xl font-black text-[#1D1D1F] tracking-tighter tabular-nums">1.4M<span className="text-base ml-1 opacity-100 font-bold text-harvest">t</span></div>
                        </div>
                        <div>
                            <div className="text-[13px] font-bold text-[#1D1D1F]/80 mb-2">Growth</div>
                            <div className="text-4xl font-black text-harvest tracking-tighter tabular-nums">+18<span className="text-base ml-1 opacity-100 font-bold">%</span></div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            
            {/* Visual Echo */}
            <div className="absolute inset-0 bg-harvest/10 blur-[120px] -z-10 translate-x-12 translate-y-12 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32 lg:py-48 bg-white/40 relative overflow-hidden">
        {/* Immersive Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img 
            src="https://picsum.photos/seed/grain_macro/1920/1080?blur=10"
            alt=""
            className="w-full h-full object-cover opacity-[0.13] grayscale"
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#EBF2EA] to-transparent z-1" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32">
            <div className="space-y-6">
              <span className="section-label text-harvest/60 border-harvest/20">{lang === 'EN' ? 'The Deployment' : 'Kushanda'}</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[80px] font-black text-[#1D1D1F] tracking-[-0.05em] leading-[0.9] md:leading-[0.85]">
                {lang === 'EN' ? 'Efficiency' : 'Kushanda'}<br />
                {lang === 'EN' ? 'By design.' : 'Nemazvo.'}
              </h2>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-[#1D1D1F]/80 font-medium max-w-sm leading-relaxed font-sans">
              {lang === 'EN'
                ? 'A high-bandwidth USSD core designed for resilience in low-connectivity territories.'
                : 'USSD inoshanda kunyangwe pasina dandemutande remushini wesero.'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 xl:gap-16">
            {[
              { 
                step: "Listing", 
                title: "Register Yield", 
                desc: "Farmers broadcast availability via lightweight USSD packets. No data required.",
                icon: <Leaf className="w-6 h-6" />
              },
              { 
                step: "Aggregating", 
                title: "Live Matching", 
                desc: "Real-time demand signals from urban millers are instantly routed to nearby nodes.",
                icon: <Users className="w-6 h-6" />
              },
              { 
                step: "Closing", 
                title: "Secure Settlement", 
                desc: "Integrated escrow ensures payment finality before grain logistics trigger.",
                icon: <ShieldCheck className="w-6 h-6" />
              }
            ].map((item, i) => (
              <motion.div 
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group p-1 bg-white rounded-2xl lg:rounded-[3.5rem] border border-[#1D1D1F]/5 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="p-6 md:p-8 lg:p-10 space-y-6 md:space-y-8 lg:space-y-10">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-[#1D1D1F] text-white rounded-xl lg:rounded-[1.5rem] flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-500">
                            {item.icon}
                        </div>
                        <span className="text-[14px] font-bold text-[#1D1D1F]/50">{item.step}</span>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#1D1D1F] tracking-tighter">{item.title}</h3>
                        <p className="text-sm md:text-base lg:text-lg text-[#1D1D1F]/70 font-medium leading-relaxed font-sans">{item.desc}</p>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* USSD Experience Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32 lg:py-48 bg-[#FAFAF9] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 xl:gap-32 items-center">
                <div className="order-2 lg:order-1 relative">
                    {/* Device Mockup (Apple HIG style) */}
                    <div className="relative mx-auto w-[260px] h-[520px] sm:w-[280px] sm:h-[560px] md:w-[300px] md:h-[600px] lg:w-[320px] lg:h-[640px] bg-[#1D1D1F] rounded-[2.5rem] lg:rounded-[3.5rem] p-3 lg:p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[6px] lg:border-[8px] border-[#2C2C2E]">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 lg:w-32 h-5 lg:h-7 bg-[#1D1D1F] rounded-b-2xl" /> {/* Dynamic Island */}
                        
                        <div className="w-full h-full bg-[#1D1D1F] rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-center p-8 space-y-8 font-mono">
                            <div className="text-maize text-lg animate-pulse tracking-wide">MaizeConnect</div>
                            <div className="w-full border-t border-white/10 pt-8 space-y-4">
                                <div className="text-white/80 text-sm font-medium">1. Sell maize</div>
                                <div className="text-white/80 text-sm font-medium">2. Buy maize</div>
                                <div className="text-white/80 text-sm font-medium">3. Current prices</div>
                                <div className="text-white/80 text-sm font-medium">4. Transporter log</div>
                            </div>
                            <div className="w-full h-12 bg-white/5 rounded-xl border border-white/10 flex items-center px-4 text-white">
                                _
                            </div>
                            <div className="flex gap-4 w-full">
                                <div className="flex-1 h-10 bg-white/10 rounded-lg flex items-center justify-center text-[11px] font-bold text-white tracking-wide">Cancel</div>
                                <div className="flex-1 h-10 bg-maize rounded-lg flex items-center justify-center text-[11px] font-bold text-harvest tracking-wide">Send</div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-maize/20 rounded-full blur-3xl" />
                </div>
                
                <div className="order-1 lg:order-2 space-y-12">
                    <div className="space-y-6">
            <span className="text-sm font-bold text-harvest/90 uppercase tracking-widest">{lang === 'EN' ? 'Accessibility first' : 'Kuwanikwa kwevose'}</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[70px] font-black text-[#1D1D1F] tracking-[-0.05em] leading-[0.9]">
                            {lang === 'EN' ? 'Technology' : 'Tekinoroji'}<br />
                            {lang === 'EN' ? 'For everyone.' : 'Yevanhu vose.'}
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#1D1D1F]/80 font-medium leading-relaxed font-sans">
                        {lang === 'EN'
                            ? 'We believe progress should be inclusive. Our USSD protocol allows any farmer to enter the marketplace using a basic mobile device—no data, no smartphone, no barriers.'
                            : 'Tinotenda kuti mberi kunobvumidzwa nevanhu vese. USSD yedu inobvumira murimi wese kupinda mumusika asina foni yepamusoro.'}
                    </p>
                    <div className="space-y-6">
                        {[
                            { title: 'Zero Data Usage', desc: 'Protocol runs on pure GSM signals, costing zero data for the farmer.' },
                            { title: 'Instant Broadcast', desc: 'Listings hit the national aggregator network in under 3 seconds.' },
                            { title: 'Local Languages', desc: 'Full support for Shona and Ndebele menu systems.' }
                        ].map((item) => (
                            <div key={item.title} className="flex gap-6 items-start">
                                <div className="w-6 h-6 rounded-full bg-harvest/20 flex items-center justify-center mt-1">
                                    <CheckCircle2 className="w-4 h-4 text-harvest" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-[#1D1D1F]">{item.title}</h4>
                                    <p className="text-[#1D1D1F]/65 font-medium">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Territory Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32 lg:py-48 bg-white/40 relative overflow-hidden">
         <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 xl:gap-32 items-center">
            <div className="space-y-12">
              <span className="text-sm font-bold text-harvest/90 uppercase tracking-widest">{lang === 'EN' ? 'Territory expansion' : 'Kuwedzera nharaunda'}</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[70px] font-black text-[#1D1D1F] tracking-[-0.05em] leading-[0.9]">
                Covering the <br />entire nation.
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#1D1D1F]/80 font-medium leading-relaxed max-w-xl font-sans">
                From the fertile soils of Mashonaland West to the industrial hubs of Harare, our protocol maps agricultural demand with pinpoint precision.
              </p>
              <div className="flex flex-wrap gap-4">
                {['Harare', 'Mash West', 'Mash Central', 'Midlands', 'Masvingo'].map(region => (
                  <span key={region} className="px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 bg-white border border-harvest/20 rounded-xl lg:rounded-2xl text-[11px] md:text-[12px] font-bold text-harvest">{region}</span>
                ))}
              </div>
            </div>
            
            <div className="relative group">
                <div className="aspect-[4/3] bg-[#F2F7F2] rounded-3xl lg:rounded-[4rem] border border-[#1D1D1F]/5 overflow-hidden shadow-2xl relative">
                    <img 
                        src="https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=2000" 
                        alt="Zimbabwe Farm" 
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[8s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-harvest/20 to-transparent" />
                    
                    {/* Visual Interface Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white/20 backdrop-blur-2xl rounded-full border border-white/40 flex items-center justify-center shadow-2xl">
                            <Navigation className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white" />
                        </div>
                    </div>
                    
                    <div className="absolute top-4 right-4 md:top-6 md:right-6 lg:top-10 lg:right-10 px-3 py-1.5 md:px-4 md:py-2 lg:px-6 lg:py-3 bg-white/80 backdrop-blur-3xl rounded-xl lg:rounded-2xl border border-white/40 shadow-xl">
                        <span className="text-[11px] font-bold text-[#1D1D1F]">Active provincies: 10</span>
                    </div>
                </div>
                
                {/* Decorative floating card */}
                <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="absolute -bottom-10 -right-10 p-8 bg-harvest rounded-[2.5rem] shadow-2xl shadow-harvest/30 hidden lg:block border-4 border-white"
                >
                    <div className="flex items-center gap-6 text-white">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-[11px] font-bold opacity-80 mb-1">Coverage</div>
                            <div className="text-2xl font-black tabular-nums tracking-tighter">100%</div>
                        </div>
                    </div>
                </motion.div>
            </div>
         </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32 lg:py-48 bg-[#E9F0E8] relative overflow-hidden">
        {/* Impact Background Visual */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img 
            src="https://picsum.photos/seed/rural_zimbabwe/1920/1080"
            alt=""
            className="w-full h-full object-cover opacity-[0.13] mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#E9F0E8] via-transparent to-[#E9F0E8]" />
        </div>
        <div className="max-w-[1400px] mx-auto text-center space-y-32 relative z-10">
          <div className="space-y-6">
            <span className="text-sm font-bold text-harvest/90 uppercase tracking-widest">Ecosystem performance</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[80px] font-black text-[#1D1D1F] tracking-[-0.05em] leading-none font-display">Verified data.</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {[
              { label: lang === 'EN' ? 'Coverage' : 'Kusvika Kwenyika', value: '10', sub: 'Provinces', desc: lang === 'EN' ? 'Full national coverage' : 'Munzvimbo dzose' },
              { label: lang === 'EN' ? 'Target Volume' : 'Chinangwa Chegoho', value: '1.5M', sub: 'Tons', desc: lang === 'EN' ? 'Annual trade capacity' : 'Chinangwa chegore' },
              { label: lang === 'EN' ? 'System Uptime' : 'Kushanda Kweye', value: '99.9', sub: '%', desc: lang === 'EN' ? 'Rural connectivity SLA' : 'USSD yakavimbika' }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-6 md:p-8 lg:p-12 rounded-2xl lg:rounded-[4rem] bg-white shadow-2xl shadow-black/[0.03] border border-white relative group"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1D1D1F] tracking-tighter mb-2 flex items-baseline justify-center gap-1">
                    {stat.value}<span className="text-xl opacity-100 text-harvest">{stat.sub}</span>
                </div>
                <div className="text-[14px] font-black text-harvest mb-6">{stat.label}</div>
                <p className="text-[14px] font-semibold text-[#1D1D1F]/70 leading-relaxed text-center font-sans">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 bg-white/20 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-16 relative z-10 border-t border-[#1D1D1F]/10 pt-32">
          <div className="space-y-10">
            <div className="flex items-center gap-5">
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.06em] text-[#1D1D1F] leading-none mb-1">MaizeConnect</span>
                <span className="text-sm font-bold text-harvest opacity-100">Agricultural intelligence</span>
              </div>
            </div>
            <div className="text-sm font-bold text-[#1D1D1F]/85 max-w-xs leading-relaxed">The premium digital backbone for Zimbabwean grain trade.</div>
            <div className="text-[13px] font-bold text-[#1D1D1F]/70 px-4 py-2 bg-[#1D1D1F]/5 rounded-full inline-block">© 2026 MaizeConnect. All rights reserved.</div>
          </div>
          
          <div className="text-center md:text-right space-y-4">
            <div className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1D1D1F] tracking-tighter mb-2">*265*98#</div>
            <div className="text-base font-bold text-harvest opacity-80">Connected Zimbabwe</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
