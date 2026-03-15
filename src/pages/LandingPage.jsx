import { useNavigate } from 'react-router-dom'
import Threads from '../components/Threads'

function AbstractShape({ className, style }) {
  return <div className={className} style={style} />
}

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>

      {/* ─── HERO ─── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden pt-20"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 60% 40%, rgba(222,49,99,0.09) 0%, transparent 65%),
            radial-gradient(ellipse 60% 80% at 10% 70%, rgba(246,166,178,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 85% 85%, rgba(13,27,42,0.06) 0%, transparent 55%),
            var(--color-bg)
          `,
        }}
      >
        {/* Floating shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large circle top-right */}
          <div
            className="float-shape absolute"
            style={{
              width: 380, height: 380,
              borderRadius: '50%',
              border: '1.5px solid rgba(222,49,99,0.12)',
              top: '-80px', right: '-80px',
            }}
          />
          {/* Small filled circle */}
          <div
            className="float-shape-r absolute"
            style={{
              width: 60, height: 60,
              borderRadius: '50%',
              background: 'rgba(246,166,178,0.35)',
              top: '22%', right: '15%',
            }}
          />
          {/* Diamond / rotated square */}
          <div
            className="float-slow absolute"
            style={{
              width: 110, height: 110,
              background: 'rgba(222,49,99,0.07)',
              borderRadius: '18px',
              transform: 'rotate(45deg)',
              bottom: '20%', left: '8%',
            }}
          />
          {/* Dotted grid pattern */}
          <svg
            className="absolute opacity-[0.07]"
            style={{ top: '10%', left: '2%', width: 240, height: 240 }}
            viewBox="0 0 120 120"
          >
            {Array.from({ length: 6 }).map((_, row) =>
              Array.from({ length: 6 }).map((_, col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={10 + col * 20}
                  cy={10 + row * 20}
                  r="2.5"
                  fill="#DE3163"
                />
              ))
            )}
          </svg>
          {/* Textile-inspired arc */}
          <svg
            className="float-shape absolute"
            style={{ bottom: '5%', right: '5%', width: 280, height: 280, opacity: 0.08 }}
            viewBox="0 0 200 200"
          >
            <path
              d="M100 20 Q180 100 100 180 Q20 100 100 20Z"
              fill="none"
              stroke="#DE3163"
              strokeWidth="2"
            />
            <path
              d="M100 40 Q160 100 100 160 Q40 100 100 40Z"
              fill="none"
              stroke="#DE3163"
              strokeWidth="2"
            />
            <path
              d="M100 60 Q140 100 100 140 Q60 100 100 60Z"
              fill="none"
              stroke="#DE3163"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div
              className="anim-1 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8"
              style={{
                background: 'rgba(222,49,99,0.1)',
                color: 'var(--color-primary)',
                fontFamily: "'Manrope', sans-serif",
                border: '1px solid rgba(222,49,99,0.2)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full pulse-ring"
                style={{ background: 'var(--color-primary)', display: 'inline-block' }}
              />
              Voice-guided · Available in Telugu, Hindi & English
            </div>

            <h1
              className="anim-2 text-5xl md:text-6xl leading-[1.1] mb-6"
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 700,
                color: 'var(--color-navy)',
              }}
            >
              Digital skills for{' '}
              <span style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>
                every woman
              </span>{' '}
              entrepreneur
            </h1>

            <p
              className="anim-3 text-lg leading-relaxed mb-10 max-w-md"
              style={{ color: 'var(--color-muted)', fontFamily: "'Manrope', sans-serif" }}
            >
              Learn UPI, digital safety, and online business skills through simple
              voice-guided lessons — designed for low-bandwidth and first-time learners.
            </p>

            <div className="anim-4 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/language')}
                className="px-8 py-3.5 rounded-xl text-white font-semibold text-base transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  fontFamily: "'Manrope', sans-serif",
                  boxShadow: '0 6px 24px rgba(222,49,99,0.4)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(246,166,178,0.6)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(222,49,99,0.4)'
                }}
              >
                Start Learning →
              </button>
              <button
                onClick={() => navigate('/modules')}
                className="px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 hover:scale-105"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  color: 'var(--color-navy)',
                  border: '1.5px solid rgba(13,27,42,0.15)',
                  background: 'white',
                }}
              >
                Explore Modules
              </button>
            </div>

            {/* Trust bar */}
            <div className="anim-5 flex items-center gap-6 mt-10">
              {['5,000+ learners', 'Free forever', 'Works offline'].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-muted)' }}>
                  <span style={{ color: 'var(--color-primary)' }}>✦</span>
                  <span style={{ fontFamily: "'Manrope', sans-serif" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div className="anim-3 hidden md:flex justify-center">
            <div className="relative">
              {/* Phone mockup */}
              <div
                className="relative w-64 h-[480px] rounded-[2.5rem] overflow-hidden"
                style={{
                  background: 'var(--color-navy)',
                  boxShadow: '0 40px 80px rgba(13,27,42,0.3), 0 0 0 8px rgba(13,27,42,0.1)',
                }}
              >
                {/* Screen content */}
                <div className="absolute inset-2 rounded-[2rem] overflow-hidden" style={{ background: 'var(--color-bg)' }}>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: 'var(--color-primary)' }}
                      >T</div>
                      <span className="font-semibold text-sm" style={{ fontFamily: "'Fraunces', serif" }}>TARA</span>
                    </div>
                    <p className="text-xs mb-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Today's Lesson</p>
                    <div
                      className="rounded-2xl p-4 mb-4"
                      style={{ background: 'rgba(222,49,99,0.06)', border: '1px solid rgba(222,49,99,0.1)' }}
                    >
                      <div className="text-2xl mb-2">💳</div>
                      <div className="text-sm font-semibold mb-1" style={{ fontFamily: "'Fraunces', serif" }}>UPI Basics</div>
                      <div className="text-xs" style={{ color: 'var(--color-muted)' }}>Send money safely using UPI</div>
                      <div className="mt-3 h-1.5 rounded-full" style={{ background: 'rgba(222,49,99,0.12)' }}>
                        <div className="h-full rounded-full w-3/5" style={{ background: 'var(--color-primary)' }} />
                      </div>
                    </div>
                    {['🔐 Digital Safety', '🛒 Online Selling'].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 py-2.5 px-3 rounded-xl mb-2 text-xs"
                        style={{ background: 'white', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}
                      >
                        <span>{item.split(' ')[0]}</span>
                        <span style={{ color: 'var(--color-text)', fontFamily: "'Manrope', sans-serif" }}>
                          {item.split(' ').slice(1).join(' ')}
                        </span>
                      </div>
                    ))}
                    {/* Voice button */}
                    <div
                      className="mt-4 w-full py-2.5 rounded-xl text-white text-xs font-semibold text-center"
                      style={{ background: 'var(--color-primary)' }}
                    >
                      🎙 Play Voice Guide
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div
                className="float-shape-r absolute -right-6 top-12 px-3 py-2 rounded-xl text-xs font-semibold"
                style={{
                  background: 'white',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  color: 'var(--color-text)',
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                🎧 Voice-guided
              </div>
              <div
                className="float-slow absolute -left-8 bottom-16 px-3 py-2 rounded-xl text-xs font-semibold"
                style={{
                  background: 'white',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  color: 'var(--color-text)',
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                ✦ Low bandwidth
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: 'white' }}>
        {/* Threads WebGL background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            opacity: 0.55,
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)',
          }}
        >
          <Threads
            color={[0.87, 0.19, 0.39]}
            amplitude={1}
            distance={0}
            enableMouseInteraction
          />
        </div>

        <div className="max-w-6xl mx-auto relative" style={{ zIndex: 1 }}>
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl mb-4"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: 'var(--color-navy)' }}
            >
              Learning that fits your life
            </h2>
            <p className="text-base max-w-md mx-auto" style={{ color: 'var(--color-muted)', fontFamily: "'Manrope', sans-serif" }}>
              Built for women in rural India — practical, accessible, and always in your language.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎙',
                title: 'Voice-Guided Learning',
                desc: 'Every lesson is narrated in your language. No reading required — just listen and learn.',
              },
              {
                icon: '⚡',
                title: 'Short Micro Lessons',
                desc: '5-minute lessons that fit between your daily work. Learn at your own pace, anytime.',
              },
              {
                icon: '📶',
                title: 'Works with Low Internet',
                desc: 'Designed for 2G and 3G networks. Download lessons and learn even without connectivity.',
              },
            ].map(({ icon, title, desc }, i) => (
              <div
                key={title}
                className="rounded-2xl p-8 transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(222,49,99,0.08)',
                  opacity: 0,
                  animation: `fadeSlideUp 0.6s ${0.1 + i * 0.15}s ease forwards`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(222,49,99,0.12)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.95)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.85)'
                }}
              >
                <div className="text-4xl mb-5">{icon}</div>
                <h3
                  className="text-xl mb-3"
                  style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, color: 'var(--color-navy)' }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)', fontFamily: "'Manrope', sans-serif" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER CTA ─── */}
      <section
        className="py-24 px-6 relative overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 70% 70% at 50% 50%, rgba(222,49,99,0.08) 0%, transparent 70%),
            var(--color-bg)
          `,
        }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl mb-5"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: 'var(--color-navy)' }}
          >
            Start your learning journey today
          </h2>
          <p
            className="text-base mb-10"
            style={{ color: 'var(--color-muted)', fontFamily: "'Manrope', sans-serif" }}
          >
            Join thousands of women entrepreneurs building their digital confidence with TARA.
          </p>
          <button
            onClick={() => navigate('/language')}
            className="px-10 py-4 rounded-xl text-white font-semibold text-base transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: 'var(--color-primary)',
              fontFamily: "'Manrope', sans-serif",
              boxShadow: '0 8px 30px rgba(222,49,99,0.4)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(246,166,178,0.6)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(222,49,99,0.4)'
            }}
          >
            Get Started — It's Free
          </button>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        className="py-10 px-6"
        style={{ background: 'var(--color-navy)' }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs"
              style={{ background: 'var(--color-primary)' }}
            >T</div>
            <span
              className="text-white text-lg"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
            >TARA</span>
          </div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Manrope', sans-serif" }}>
            Empowering rural women entrepreneurs through digital education.
          </p>
        </div>
      </footer>
    </div>
  )
}
