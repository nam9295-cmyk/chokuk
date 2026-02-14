import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, Send, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import heroBg from './assets/hero-bg-white.png';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const FadeIn = ({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

function App() {
  const [formState, setFormState] = useState({
    name: '',
    contact: '',
    offer: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white overflow-x-hidden font-sans">

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        {/* Background Image: High-Key Watermark Style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-multiply"
            style={{ backgroundImage: `url(${heroBg})` }}
          />
        </motion.div>

        {/* Subtle Gradient Overlay for Depth */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-white via-transparent to-white/50" />

        <FadeIn delay={0.2} className="relative z-10 space-y-8 max-w-5xl mx-auto">
          <motion.h1
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-black drop-shadow-sm"
          >
            CHOKUK<span className="text-neutral-400">.CO.KR</span>
          </motion.h1>

          <div className="w-24 h-1 bg-black mx-auto" />

          <p className="text-xl md:text-3xl text-neutral-600 font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            대한민국을 움직이는 키워드,<br className="md:hidden" /> 그 주인이 되십시오.
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="pt-8"
          >
            <a
              href="#offer"
              className="inline-block px-12 py-5 text-lg font-bold tracking-widest text-white bg-black hover:bg-neutral-800 transition-all duration-300 shadow-lg hover:shadow-xl rounded-none uppercase"
            >
              Make an Offer
            </a>
          </motion.div>
        </FadeIn>
      </section>

      {/* Value Proposition Section */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-neutral-100 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold mb-20 text-center tracking-tight text-neutral-900">
              Why This Domain?
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <TrendingUp className="w-12 h-12 text-black" />,
                title: "Overwhelming Traffic",
                titleKo: "압도적인 검색량과 트래픽",
                desc: "Ensure immediate visibility with a keyword that dominates search engines."
              },
              {
                icon: <Award className="w-12 h-12 text-black" />,
                title: "Powerful Branding",
                titleKo: "강력한 퍼스널 브랜딩",
                desc: "Establish instant authority and recognition in the political or media landscape."
              },
              {
                icon: <Users className="w-12 h-12 text-black" />,
                title: "Massive Impact",
                titleKo: "전 국민적 파급력",
                desc: "Reach audiences across the spectrum with a name that everyone knows."
              }
            ].map((item, index) => (
              <FadeIn key={index} delay={index * 0.2}>
                <div className="group h-full p-10 bg-white border border-neutral-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  <div className="mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm font-semibold text-neutral-500 uppercase tracking-widest mb-4">
                    {item.titleKo}
                  </p>
                  <p className="text-neutral-600 leading-relaxed text-lg">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Form Section */}
      <section id="offer" className="py-32 px-6 flex items-center justify-center relative bg-neutral-50">
        <div className="w-full max-w-3xl relative z-10">
          <FadeIn>
            <div className="bg-white p-10 md:p-16 shadow-xl border border-neutral-100">
              <div className="mb-12 text-center">
                <h2 className="text-4xl font-bold mb-4 text-black">Inquiry</h2>
                <p className="text-neutral-500 text-lg">Send your official offer for this premium domain.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Name / Org</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-transparent border-b-2 border-neutral-200 p-3 text-black text-lg focus:outline-none focus:border-black transition-colors placeholder-neutral-300"
                      placeholder="Name or Organization"
                      value={formState.name}
                      onChange={e => setFormState({ ...formState, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Contact</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-transparent border-b-2 border-neutral-200 p-3 text-black text-lg focus:outline-none focus:border-black transition-colors placeholder-neutral-300"
                      placeholder="Phone or Email"
                      value={formState.contact}
                      onChange={e => setFormState({ ...formState, contact: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Offer Price (KRW)</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-transparent border-b-2 border-neutral-200 p-3 text-black text-2xl font-bold focus:outline-none focus:border-black transition-colors placeholder-neutral-300 font-mono"
                    placeholder="₩ 100,000,000"
                    value={formState.offer}
                    onChange={e => setFormState({ ...formState, offer: e.target.value })}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Message</label>
                  <textarea
                    rows={4}
                    className="w-full bg-transparent border-b-2 border-neutral-200 p-3 text-black text-lg focus:outline-none focus:border-black transition-colors resize-none placeholder-neutral-300"
                    placeholder="Provide additional details or inquiries."
                    value={formState.message}
                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={isSubmitted}
                  className={cn(
                    "w-full py-6 font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 text-lg border-2",
                    isSubmitted ? "bg-white text-green-600 border-green-600" : "bg-black text-white border-black hover:bg-white hover:text-black"
                  )}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle2 className="w-6 h-6" /> Sent Successfully
                    </>
                  ) : (
                    <>
                      Submit Official Offer <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-200 text-center text-neutral-400 bg-white">
        <p className="text-sm mb-4">© 2026 CHOKUK.CO.KR. All rights reserved.</p>
        <a href="mailto:contact@chokuk.co.kr" className="hover:text-black transition-colors font-medium">
          contact@chokuk.co.kr
        </a>
      </footer>
    </div>
  );
}

export default App;
