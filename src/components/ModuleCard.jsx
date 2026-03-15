import { useNavigate } from 'react-router-dom'

export default function ModuleCard({ icon, title, description, color, delay = 0, lessonId }) {
  const navigate = useNavigate()

  return (
    <div
      className="group relative rounded-2xl p-6 cursor-pointer transition-all duration-300"
      style={{
        background: 'white',
        boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
        opacity: 0,
        animationDelay: `${delay}s`,
        animationFillMode: 'forwards',
        animation: `fadeSlideUp 0.6s ${delay}s ease forwards`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(222,49,99,0.15)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.07)'
      }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
        style={{ background: color || 'rgba(222,49,99,0.08)' }}
      >
        {icon}
      </div>

      {/* Content */}
      <h3
        className="text-lg mb-2"
        style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, color: 'var(--color-text)' }}
      >
        {title}
      </h3>
      <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
        {description}
      </p>

      {/* Button */}
      <button
        onClick={() => navigate(`/lesson/${lessonId || 'upi-basics'}`)}
        className="w-full py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:scale-105"
        style={{
          backgroundColor: 'var(--color-primary)',
          fontFamily: "'Manrope', sans-serif",
          boxShadow: '0 4px 12px rgba(222,49,99,0.3)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(246,166,178,0.6)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(222,49,99,0.3)'
        }}
      >
        Start Lesson →
      </button>

      {/* Decorative corner */}
      <div
        className="absolute top-0 right-0 w-16 h-16 rounded-tr-2xl rounded-bl-full opacity-20 transition-opacity duration-300 group-hover:opacity-40"
        style={{ background: color || 'rgba(222,49,99,0.15)' }}
      />
    </div>
  )
}
