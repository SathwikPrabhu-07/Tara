import { useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav
      style={{ backgroundColor: 'var(--color-navy)' }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 group"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            T
          </div>
          <span
            className="text-white text-xl tracking-wide"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
          >
            TARA
          </span>
        </button>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Modules', path: '/modules' },
            { label: 'Progress', path: '/progress' },
          ].map(({ label, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="text-sm transition-colors duration-200"
              style={{
                fontFamily: "'Manrope', sans-serif",
                color: location.pathname === path
                  ? 'var(--color-primary-light)'
                  : 'rgba(255,255,255,0.65)',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate('/language')}
          className="px-5 py-2 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: 'var(--color-primary)',
            fontFamily: "'Manrope', sans-serif",
            boxShadow: '0 4px 14px rgba(222,49,99,0.4)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(246,166,178,0.6)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(222,49,99,0.4)'
          }}
        >
          Start Learning
        </button>
      </div>
    </nav>
  )
}
