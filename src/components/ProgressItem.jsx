export default function ProgressItem({ icon, title, completed, index }) {
  return (
    <div
      className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200"
      style={{
        background: 'white',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        opacity: 0,
        animation: `fadeSlideUp 0.5s ${0.1 + index * 0.1}s ease forwards`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(222,49,99,0.1)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'
      }}
    >
      {/* Status indicator */}
      <div
        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200"
        style={{
          background: completed ? 'var(--color-primary)' : 'rgba(107,107,107,0.1)',
          color: completed ? 'white' : 'var(--color-muted)',
        }}
      >
        {completed ? '✓' : '○'}
      </div>

      {/* Icon */}
      <span className="text-xl">{icon}</span>

      {/* Title */}
      <span
        className="flex-1 text-sm font-semibold"
        style={{
          fontFamily: "'Manrope', sans-serif",
          color: completed ? 'var(--color-text)' : 'var(--color-muted)',
          textDecoration: completed ? 'none' : 'none',
        }}
      >
        {title}
      </span>

      {/* Badge */}
      {completed && (
        <span
          className="px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{
            background: 'rgba(222,49,99,0.1)',
            color: 'var(--color-primary)',
            fontFamily: "'Manrope', sans-serif",
          }}
        >
          Complete
        </span>
      )}
      {!completed && (
        <span
          className="px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{
            background: 'rgba(107,107,107,0.07)',
            color: 'var(--color-muted)',
            fontFamily: "'Manrope', sans-serif",
          }}
        >
          Pending
        </span>
      )}
    </div>
  )
}
