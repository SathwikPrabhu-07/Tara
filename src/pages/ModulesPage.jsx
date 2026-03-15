import ModuleCard from '../components/ModuleCard'

const MODULES = [
  {
    id: 'upi-basics',
    icon: '💳',
    title: 'UPI Basics',
    description: 'Learn to send and receive money using UPI apps safely and confidently.',
    color: 'rgba(222,49,99,0.08)',
  },
  {
    id: 'digital-safety',
    icon: '🔐',
    title: 'Digital Safety',
    description: 'Protect yourself from scams and fraud. Keep your accounts and data secure.',
    color: 'rgba(246,166,178,0.15)',
  },
  {
    id: 'online-selling',
    icon: '🛒',
    title: 'Online Selling',
    description: 'Sell your products on WhatsApp, Instagram, and local marketplaces like Meesho.',
    color: 'rgba(13,27,42,0.05)',
  },
  {
    id: 'business-finance',
    icon: '📊',
    title: 'Business Finance',
    description: 'Track income, manage expenses, and access government loan schemes for women.',
    color: 'rgba(222,49,99,0.05)',
  },
]

export default function ModulesPage() {
  return (
    <div
      className="min-h-screen pt-24 pb-20 px-6"
      style={{
        background: `
          radial-gradient(ellipse 60% 50% at 80% 20%, rgba(222,49,99,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 50% 60% at 10% 80%, rgba(246,166,178,0.08) 0%, transparent 55%),
          var(--color-bg)
        `,
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 anim-1">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{
              background: 'rgba(222,49,99,0.08)',
              color: 'var(--color-primary)',
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            📚 Learning Modules
          </div>
          <h1
            className="text-3xl md:text-4xl mb-3"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: 'var(--color-navy)' }}
          >
            What would you like to learn?
          </h1>
          <p
            className="text-base max-w-lg"
            style={{ color: 'var(--color-muted)', fontFamily: "'Manrope', sans-serif" }}
          >
            Each module takes around 20–30 minutes and includes voice-guided lessons, quizzes, and practical tips.
          </p>
        </div>

        {/* Module grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MODULES.map((mod, i) => (
            <ModuleCard
              key={mod.id}
              icon={mod.icon}
              title={mod.title}
              description={mod.description}
              color={mod.color}
              delay={0.1 + i * 0.12}
              lessonId={mod.id}
            />
          ))}
        </div>

        {/* Bottom note */}
        <div
          className="mt-14 p-6 rounded-2xl text-center"
          style={{
            background: 'rgba(222,49,99,0.05)',
            border: '1px solid rgba(222,49,99,0.12)',
          }}
        >
          <p
            className="text-sm"
            style={{ color: 'var(--color-muted)', fontFamily: "'Manrope', sans-serif" }}
          >
            💡 <strong style={{ color: 'var(--color-text)' }}>Tip:</strong> Start with{' '}
            <strong style={{ color: 'var(--color-primary)' }}>UPI Basics</strong> if you're new to digital payments.
            It's the most popular module among our learners.
          </p>
        </div>
      </div>
    </div>
  )
}
