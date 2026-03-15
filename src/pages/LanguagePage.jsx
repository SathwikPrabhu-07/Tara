import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Hyperspeed from '../components/Hyperspeed'

const LANGUAGES = [
  { code: 'te', label: 'తెలుగు', sub: 'Telugu', flag: '🇮🇳', greeting: 'నమస్కారం!' },
  { code: 'hi', label: 'हिन्दी', sub: 'Hindi',  flag: '🇮🇳', greeting: 'नमस्ते!' },
  { code: 'en', label: 'English', sub: 'English', flag: '🌐', greeting: 'Hello!' },
]

export default function LanguagePage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  const hyperspeedOptions = useMemo(() => ({
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 4,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.03, 400 * 0.2],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
      roadColor: 0xf0f0f0,
      islandColor: 0xf5f5f5,
      background: 0xffffff,
      shoulderLines: 0xdddddd,
      brokenLines: 0xdddddd,
      leftCars: [0xde3163, 0xf6a6b2, 0xc247ac],
      rightCars: [0x8b5cf6, 0xa78bfa, 0xc4b5fd],
      sticks: 0xf6a6b2,
    },
  }), [])

  function handleSelect(code) {
    setSelected(code)
  }

  function handleContinue() {
    if (!selected) return
    localStorage.setItem('tara-language', selected)
    setConfirmed(true)
    setTimeout(() => navigate('/modules'), 600)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 pt-20 pb-16 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 70% 70% at 70% 30%, rgba(222,49,99,0.08) 0%, transparent 60%),
          radial-gradient(ellipse 60% 60% at 20% 80%, rgba(246,166,178,0.1) 0%, transparent 55%),
          var(--color-bg)
        `,
      }}
    >
      {/* Hyperspeed background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Hyperspeed effectOptions={hyperspeedOptions} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10 anim-1">
          <div
            className="inline-flex w-14 h-14 rounded-2xl items-center justify-center text-3xl mb-5 mx-auto"
            style={{ background: 'rgba(222,49,99,0.1)' }}
          >
            🌐
          </div>
          <h1
            className="text-3xl md:text-4xl mb-3"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: 'var(--color-navy)' }}
          >
            Choose your language
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-muted)', fontFamily: "'Manrope', sans-serif" }}>
            Select the language you're most comfortable learning in.
          </p>
        </div>

        {/* Language cards */}
        <div className="flex flex-col gap-4 mb-8">
          {LANGUAGES.map(({ code, label, sub, flag, greeting }, i) => {
            const isSelected = selected === code
            return (
              <button
                key={code}
                onClick={() => handleSelect(code)}
                className="flex items-center gap-5 p-5 rounded-2xl text-left transition-all duration-200"
                style={{
                  background: isSelected ? 'rgba(222,49,99,0.06)' : 'white',
                  border: isSelected
                    ? '2px solid var(--color-primary)'
                    : '2px solid rgba(0,0,0,0.06)',
                  boxShadow: isSelected
                    ? '0 8px 30px rgba(222,49,99,0.18)'
                    : '0 2px 12px rgba(0,0,0,0.05)',
                  opacity: 0,
                  animation: `fadeSlideUp 0.5s ${0.1 + i * 0.12}s ease forwards`,
                  transform: isSelected ? 'scale(1.01)' : 'scale(1)',
                }}
              >
                <span className="text-3xl">{flag}</span>
                <div className="flex-1">
                  <div
                    className="text-xl font-semibold"
                    style={{
                      fontFamily: "'Fraunces', serif",
                      color: isSelected ? 'var(--color-primary)' : 'var(--color-navy)',
                    }}
                  >
                    {label}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: 'var(--color-muted)', fontFamily: "'Manrope', sans-serif" }}
                  >
                    {sub}
                  </div>
                </div>
                {isSelected && (
                  <div className="ml-auto">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: 'var(--color-primary)' }}
                    >
                      ✓
                    </div>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Greeting preview */}
        {selected && (
          <div
            className="text-center py-3 rounded-xl mb-6 text-sm font-semibold"
            style={{
              background: 'rgba(222,49,99,0.07)',
              color: 'var(--color-primary)',
              fontFamily: "'Fraunces', serif",
              fontSize: '1.1rem',
              animation: 'fadeSlideUp 0.4s ease forwards',
            }}
          >
            {LANGUAGES.find(l => l.code === selected)?.greeting}
          </div>
        )}

        {/* Continue button */}
        <button
          onClick={handleContinue}
          disabled={!selected}
          className="w-full py-4 rounded-xl text-white font-semibold text-base transition-all duration-200"
          style={{
            fontFamily: "'Manrope', sans-serif",
            background: selected ? 'var(--color-primary)' : 'rgba(0,0,0,0.1)',
            color: selected ? 'white' : 'var(--color-muted)',
            boxShadow: selected ? '0 6px 24px rgba(222,49,99,0.35)' : 'none',
            cursor: selected ? 'pointer' : 'not-allowed',
            opacity: confirmed ? 0.6 : 1,
          }}
          onMouseEnter={e => {
            if (selected) e.currentTarget.style.boxShadow = '0 8px 28px rgba(246,166,178,0.6)'
          }}
          onMouseLeave={e => {
            if (selected) e.currentTarget.style.boxShadow = '0 6px 24px rgba(222,49,99,0.35)'
          }}
        >
          {confirmed ? 'Opening lessons…' : 'Continue →'}
        </button>

        <p
          className="text-center text-xs mt-4"
          style={{ color: 'var(--color-muted)', fontFamily: "'Manrope', sans-serif" }}
        >
          You can change your language at any time in settings.
        </p>
      </div>
    </div>
  )
}
