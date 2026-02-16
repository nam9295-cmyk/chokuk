import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, Send, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import heroBg from './assets/hero-bg-white.png';
import LiveInterestTracker from './components/LiveInterestTracker';

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
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/xqedbkbz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          contact: formState.contact,
          offer_price: formState.offer,
          message: formState.message
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormState({ name: '', contact: '', offer: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
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

        <FadeIn delay={0.2} className="relative z-10 space-y-8 w-full max-w-5xl mx-auto px-4">
          <motion.h1
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-[13vw] sm:text-8xl md:text-9xl font-black tracking-tight text-black drop-shadow-sm break-all w-full text-center leading-none"
          >
            CHOKUK<span className="text-neutral-400">.CO.KR</span>
          </motion.h1>

          <div className="w-24 h-1 bg-black mx-auto" />

          <p className="text-xl md:text-3xl text-neutral-600 font-light tracking-wide max-w-2xl mx-auto leading-relaxed px-6 break-keep text-center">
            대한민국을 움직이는 키워드,<br className="md:hidden" /> 그 주인이 되십시오.
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="pt-8"
          >
            <a
              href="#offer"
              className="inline-block px-8 py-4 md:px-12 md:py-5 text-base md:text-lg font-bold tracking-widest text-white bg-black hover:bg-neutral-800 transition-all duration-300 shadow-lg hover:shadow-xl rounded-none uppercase"
            >
              가치 제안하기
            </a>
          </motion.div>
        </FadeIn>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-neutral-100 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-20 text-center tracking-tight text-neutral-900">
              왜 이 도메인인가?
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <TrendingUp className="w-12 h-12 text-black" />,
                title: "압도적인 트래픽",
                desc: "검색 엔진을 장악하는 키워드로 즉각적인 노출을 보장합니다."
              },
              {
                icon: <Award className="w-12 h-12 text-black" />,
                title: "강력한 브랜딩",
                desc: "정치 및 미디어 분야에서 즉각적인 권위와 인지도를 확립하십시오."
              },
              {
                icon: <Users className="w-12 h-12 text-black" />,
                title: "전 국민적 파급력",
                desc: "모두가 아는 이름으로 전 국민에게 도달하십시오."
              }
            ].map((item, index) => (
              <FadeIn key={index} delay={index * 0.2}>
                <div className="group h-full p-10 bg-white border border-neutral-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  <div className="mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed text-lg break-keep">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Form Section */}
      <section id="offer" className="py-20 md:py-32 px-6 flex items-center justify-center relative bg-neutral-50">
        <div className="w-full max-w-3xl relative z-10">
          <FadeIn>
            <div className="bg-white p-6 md:p-16 shadow-xl border border-neutral-100">
              <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">구매 문의</h2>
                <p className="text-neutral-500 text-lg">이 프리미엄 도메인에 대한 가치를 제안해 주세요.</p>
              </div>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-neutral-50 border-2 border-green-500 p-8 text-center rounded-lg"
                >
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">제안이 성공적으로 전달되었습니다.</h3>
                  <p className="text-neutral-600">검토 후 조속히 연락드리겠습니다.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">성함 / 소속</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-transparent border-b-2 border-neutral-200 p-3 text-black text-lg focus:outline-none focus:border-black transition-colors placeholder-neutral-300 disabled:opacity-50"
                        placeholder="홍길동 / (주)한국기업"
                        value={formState.name}
                        onChange={e => setFormState({ ...formState, name: e.target.value })}
                        disabled={status === 'submitting'}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">연락처</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-transparent border-b-2 border-neutral-200 p-3 text-black text-lg focus:outline-none focus:border-black transition-colors placeholder-neutral-300 disabled:opacity-50"
                        placeholder="010-1234-5678"
                        value={formState.contact}
                        onChange={e => setFormState({ ...formState, contact: e.target.value })}
                        disabled={status === 'submitting'}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">제안 가격 (KRW)</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-transparent border-b-2 border-neutral-200 p-3 text-black text-2xl font-bold focus:outline-none focus:border-black transition-colors placeholder-neutral-300 font-mono disabled:opacity-50"
                      placeholder="₩ 100,000,000"
                      value={formState.offer}
                      onChange={e => setFormState({ ...formState, offer: e.target.value })}
                      disabled={status === 'submitting'}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">메시지</label>
                    <textarea
                      rows={4}
                      className="w-full bg-transparent border-b-2 border-neutral-200 p-3 text-black text-lg focus:outline-none focus:border-black transition-colors resize-none placeholder-neutral-300 disabled:opacity-50"
                      placeholder="추가적인 세부 사항이나 문의 내용을 남겨주세요."
                      value={formState.message}
                      onChange={e => setFormState({ ...formState, message: e.target.value })}
                      disabled={status === 'submitting'}
                    />
                  </div>

                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: status === 'submitting' ? 1 : 1.01 }}
                      whileTap={{ scale: status === 'submitting' ? 1 : 0.99 }}
                      disabled={status === 'submitting'}
                      className={cn(
                        "w-full py-6 font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 text-lg border-2",
                        status === 'submitting'
                          ? "bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed"
                          : "bg-black text-white border-black hover:bg-white hover:text-black"
                      )}
                    >
                      {status === 'submitting' ? (
                        <>
                          <span className="animate-pulse">Sending...</span>
                        </>
                      ) : (
                        <>
                          공식 제안서 제출 <Send className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>

                    {status === 'error' && (
                      <p className="text-red-500 text-center font-bold text-sm">
                        전송에 실패했습니다. 다시 시도해주세요.
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-200 text-center text-neutral-400 bg-white">
        <p className="text-sm">© 2026 CHOKUK.CO.KR. All rights reserved.</p>
      </footer>

      {/* Live Interest Tracker */}
      <LiveInterestTracker />
    </div>
  );
}

export default App;
