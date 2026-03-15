export default function LessonCard({ icon, title, subtitle, completed }) {
  return (
    <div
      className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200"
      style={{
        background: 'white',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(222,49,99,0.1)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ background: completed ? 'rgba(222,49,99,0.08)' : 'rgba(107,107,107,0.08)' }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div
          className="text-sm font-semibold truncate"
          style={{ color: 'var(--color-text)', fontFamily: "'Manrope', sans-serif" }}
        >
          {title}
        </div>
        {subtitle && (
          <div className="text-xs mt-0.5 truncate" style={{ color: 'var(--color-muted)' }}>
            {subtitle}
          </div>
        )}
      </div>
      <div
        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm"
        style={{
          background: completed ? 'var(--color-primary)' : 'rgba(107,107,107,0.1)',
          color: completed ? 'white' : 'var(--color-muted)',
        }}
      >
        {completed ? '✓' : '○'}
      </div>
    </div>
  )
}
