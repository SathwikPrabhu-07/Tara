import { useNavigate } from 'react-router-dom'
import ProgressItem from '../components/ProgressItem'

const ALL_MODULES = [
  { id: 'upi-basics',       icon: '💳', title: 'UPI Basics',      lessons: 4 },
  { id: 'digital-safety',   icon: '🔐', title: 'Digital Safety',   lessons: 3 },
  { id: 'online-selling',   icon: '🛒', title: 'Online Selling',   lessons: 5 },
  { id: 'business-finance', icon: '📊', title: 'Business Finance', lessons: 4 },
]

const STATS = [
  { label: 'Lessons done',   value: '7',   icon: '📚' },
  { label: 'Quiz average',   value: '95%', icon: '🎯' },
  { label: 'Day streak',     value: '5',   icon: '🔥' },
  { label: 'Badges earned',  value: '2',   icon: '🏅' },
]

export default function ProgressPage() {
  const navigate = useNavigate()

  const progress = JSON.parse(localStorage.getItem('tara-progress')) || { completedModules: [] }
  const MODULES = ALL_MODULES.map(mod => ({
    ...mod,
    completed: progress.completedModules.includes(mod.id),
  }))

  const completed = MODULES.filter(m => m.completed).length
  const pct = Math.round((completed / MODULES.length) * 100)

  return (
    <div
      className="min-h-screen pt-24 pb-20 px-6"
      style={{
        background: `
          radial-gradient(ellipse 60% 50% at 80% 20%, rgba(222,49,99,0.06) 0%, transparent 55%),
          radial-gradient(ellipse 50% 60% at 10% 70%, rgba(246,166,178,0.08) 0%, transparent 55%),
          var(--color-bg)
        `,
      }}
    >
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="anim-1 mb-10">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{
              background: 'rgba(222,49,99,0.08)',
              color: 'var(--color-primary)',
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            📈 Your Progress
          </div>
          <h1
            className="text-3xl md:text-4xl mb-3"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: 'var(--color-navy)' }}
          >
            You're doing great! 🌸
          </h1>
          <p
            className="text-base"
            style={{ color: 'var(--color-muted)', fontFamily: "'Manrope', sans-serif" }}
          >
            Keep building your skills — every lesson brings you closer to your goals.
          </p>
        </div>

        {/* Progress overview card */}
        <div
          className="anim-2 rounded-2xl p-8 mb-8"
          style={{
            background: 'white',
            boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Ring */}
            <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
              <div
                className="w-32 h-32 rounded-full"
                style={{
                  background: `conic-gradient(var(--color-primary) ${pct * 3.6}deg, rgba(222,49,99,0.1) 0deg)`,
                }}
              />
              <div
                className="absolute w-24 h-24 rounded-full flex items-center justify-center"
                style={{ background: 'white' }}
              >
                <div className="text-center">
                  <div
                    className="text-3xl font-bold"
                    style={{ fontFamily: "'Fraunces', serif", color: 'var(--color-primary)' }}
                  >
                    {pct}%
                  </div>
                  <div className="text-xs" style={{ color: 'var(--color-muted)' }}>complete</div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h3
                className="text-xl mb-2"
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, color: 'var(--color-navy)' }}
              >
                {completed} of {MODULES.length} modules done
              </h3>
              <p className="text-sm mb-4" style={{ color: 'var(--color-muted)', fontFamily: "'Manrope', sans-serif" }}>
                {MODULES.length - completed} modules remaining to complete your digital skills certificate.
              </p>
              {/* Bar */}
              <div className="h-3 rounded-full mb-2 overflow-hidden" style={{ background: 'rgba(222,49,99,0.1)' }}>
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    background: 'linear-gradient(90deg, var(--color-primary), var(--color-primary-light))',
                    width: `${pct}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs" style={{ color: 'var(--color-muted)', fontFamily: "'Manrope', sans-serif" }}>
                <span>Beginner</span>
                <span>Digital Skills Certificate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="anim-3 grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {STATS.map(({ label, value, icon }, i) => (
            <div
              key={label}
              className="rounded-2xl p-5 text-center"
              style={{
                background: 'white',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                opacity: 0,
                animation: `fadeSlideUp 0.5s ${0.2 + i * 0.08}s ease forwards`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(222,49,99,0.12)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'
              }}
            >
              <div className="text-2xl mb-1">{icon}</div>
              <div
                className="text-xl font-bold mb-0.5"
                style={{ fontFamily: "'Fraunces', serif", color: 'var(--color-primary)' }}
              >
                {value}
              </div>
              <div className="text-xs" style={{ color: 'var(--color-muted)', fontFamily: "'Manrope', sans-serif" }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Module list */}
        <div className="anim-4 mb-8">
          <h3
            className="text-lg mb-5"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, color: 'var(--color-navy)' }}
          >
            Module Completion
          </h3>
          <div className="flex flex-col gap-3">
            {MODULES.map((mod, i) => (
              <ProgressItem
                key={mod.title}
                icon={mod.icon}
                title={mod.title}
                completed={mod.completed}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Next step CTA */}
        <div
          className="anim-5 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            background: `linear-gradient(135deg, rgba(222,49,99,0.08) 0%, rgba(246,166,178,0.12) 100%)`,
            border: '1.5px solid rgba(222,49,99,0.15)',
          }}
        >
          <div>
            <div className="text-sm font-semibold mb-1" style={{ color: 'var(--color-navy)', fontFamily: "'Fraunces', serif" }}>
              Ready to continue?
            </div>
            <div className="text-xs" style={{ color: 'var(--color-muted)', fontFamily: "'Manrope', sans-serif" }}>
              Start your next module — Online Selling awaits!
            </div>
          </div>
          <button
            onClick={() => navigate('/modules')}
            className="px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:scale-105 whitespace-nowrap"
            style={{
              background: 'var(--color-primary)',
              fontFamily: "'Manrope', sans-serif",
              boxShadow: '0 4px 16px rgba(222,49,99,0.35)',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(246,166,178,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(222,49,99,0.35)' }}
          >
            Continue Learning →
          </button>
        </div>
      </div>
    </div>
  )
}
