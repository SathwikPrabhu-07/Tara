import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uiTranslations, quizQuestions } from '../data/uiTranslations'

export default function QuizPage() {
  const navigate = useNavigate()

  /* ---- Language & translations ---- */
  const language = localStorage.getItem('tara-language') || 'en'
  const t = uiTranslations[language] || uiTranslations.en
  const QUESTIONS = quizQuestions[language] || quizQuestions.en

  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const q = QUESTIONS[current]

  function handleSelect(i) {
    if (submitted) return
    setSelected(i)
  }

  function handleSubmit() {
    if (selected === null) return
    setSubmitted(true)
    if (selected === q.correct) {
      setScore(s => s + 1)
    }
  }

  function handleNext() {
    if (current + 1 < QUESTIONS.length) {
      setCurrent(c => c + 1)
      setSelected(null)
      setSubmitted(false)
    } else {
      // Save progress to localStorage when quiz is completed
      const moduleId =
        new URLSearchParams(window.location.search).get('module') ||
        localStorage.getItem('current-module')

      if (moduleId) {
        const progress =
          JSON.parse(localStorage.getItem('tara-progress')) || {
            completedModules: [],
          }

        if (!progress.completedModules.includes(moduleId)) {
          progress.completedModules.push(moduleId)
        }

        localStorage.setItem('tara-progress', JSON.stringify(progress))
      }

      setFinished(true)
    }
  }

  if (finished) {
    const pct = Math.round((score / QUESTIONS.length) * 100)
    const passed = pct >= 66

    return (
      <div
        className="min-h-screen pt-24 pb-20 px-6 flex items-center justify-center"
        style={{
          background: `
            radial-gradient(ellipse 60% 60% at 50% 40%, rgba(222,49,99,0.08) 0%, transparent 65%),
            var(--color-bg)
          `,
        }}
      >
        <div
          className="max-w-md w-full rounded-2xl p-10 text-center"
          style={{
            background: 'white',
            boxShadow: '0 20px 60px rgba(222,49,99,0.15)',
            animation: 'fadeSlideUp 0.5s ease forwards',
          }}
        >
          <div className="text-6xl mb-5">{passed ? '🎉' : '📚'}</div>
          <h2
            className="text-2xl mb-3"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: 'var(--color-navy)' }}
          >
            {passed ? t.lessonComplete : t.keepLearning}
          </h2>
          <p
            className="text-sm mb-8"
            style={{ color: 'var(--color-muted)', fontFamily: "'Manrope', sans-serif" }}
          >
            {passed ? t.resultPass : t.resultFail}
          </p>

          {/* Score ring */}
          <div className="flex justify-center mb-8">
            <div
              className="relative w-28 h-28 rounded-full flex items-center justify-center"
              style={{
                background: `conic-gradient(var(--color-primary) ${pct * 3.6}deg, rgba(222,49,99,0.1) 0deg)`,
              }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: 'white' }}
              >
                <div>
                  <div
                    className="text-2xl font-bold"
                    style={{ fontFamily: "'Fraunces', serif", color: 'var(--color-primary)' }}
                  >
                    {score}/{QUESTIONS.length}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--color-muted)' }}>{t.scoreLbl}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/progress')}
              className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:scale-105"
              style={{
                background: 'var(--color-primary)',
                fontFamily: "'Manrope', sans-serif",
                boxShadow: '0 6px 24px rgba(222,49,99,0.35)',
              }}
            >
              {t.viewProgress}
            </button>
            <button
              onClick={() => navigate('/modules')}
              className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
              style={{
                background: 'rgba(13,27,42,0.05)',
                color: 'var(--color-navy)',
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              {t.exploreModules}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen pt-24 pb-20 px-6"
      style={{
        background: `
          radial-gradient(ellipse 50% 50% at 80% 20%, rgba(222,49,99,0.06) 0%, transparent 60%),
          var(--color-bg)
        `,
      }}
    >
      <div className="max-w-2xl mx-auto">

        {/* Progress bar */}
        <div className="anim-1 mb-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold" style={{ color: 'var(--color-muted)', fontFamily: "'Manrope', sans-serif" }}>
              {t.questionOf.replace('{current}', current + 1).replace('{total}', QUESTIONS.length)}
            </span>
            <span className="text-xs font-semibold" style={{ color: 'var(--color-primary)', fontFamily: "'Manrope', sans-serif" }}>
              {t.scoreLbl}: {score}
            </span>
          </div>
          <div className="h-2 rounded-full" style={{ background: 'rgba(222,49,99,0.1)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                background: 'var(--color-primary)',
                width: `${((current) / QUESTIONS.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Quiz header */}
        <div className="anim-1 mb-8">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{
              background: 'rgba(222,49,99,0.08)',
              color: 'var(--color-primary)',
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            {t.quickQuiz}
          </div>
          <h2
            className="text-2xl leading-snug"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: 'var(--color-navy)' }}
          >
            {q.question}
          </h2>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3 mb-8 anim-2">
          {q.options.map((opt, i) => {
            let borderColor = 'rgba(0,0,0,0.08)'
            let bg = 'white'
            let textColor = 'var(--color-text)'
            let shadow = '0 2px 8px rgba(0,0,0,0.05)'

            if (submitted) {
              if (i === q.correct) {
                bg = 'rgba(34,197,94,0.08)'; borderColor = '#22c55e'; textColor = '#166534'
              } else if (i === selected && i !== q.correct) {
                bg = 'rgba(222,49,99,0.06)'; borderColor = 'var(--color-primary)'; textColor = 'var(--color-primary)'
              }
            } else if (selected === i) {
              bg = 'rgba(222,49,99,0.06)'
              borderColor = 'var(--color-primary)'
              shadow = '0 4px 16px rgba(222,49,99,0.18)'
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className="flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all duration-200"
                style={{
                  background: bg,
                  border: `2px solid ${borderColor}`,
                  color: textColor,
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: selected === i ? 600 : 400,
                  boxShadow: shadow,
                  cursor: submitted ? 'default' : 'pointer',
                }}
              >
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: selected === i && !submitted
                      ? 'var(--color-primary)' : 'rgba(0,0,0,0.06)',
                    color: selected === i && !submitted ? 'white' : 'var(--color-muted)',
                  }}
                >
                  {submitted && i === q.correct ? '✓' : submitted && i === selected && i !== q.correct ? '✗' : String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {submitted && (
          <div
            className="rounded-2xl p-5 mb-8"
            style={{
              background: 'rgba(222,49,99,0.05)',
              border: '1.5px solid rgba(222,49,99,0.15)',
              animation: 'fadeSlideUp 0.4s ease forwards',
            }}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">{selected === q.correct ? '🌟' : '💡'}</span>
              <div>
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: 'var(--color-primary)', fontFamily: "'Manrope', sans-serif" }}
                >
                  {selected === q.correct ? t.correct : t.wrong}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)', fontFamily: "'Manrope', sans-serif" }}>
                  {q.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
            className="w-full py-4 rounded-xl text-white font-semibold text-base transition-all duration-200"
            style={{
              fontFamily: "'Manrope', sans-serif",
              background: selected !== null ? 'var(--color-primary)' : 'rgba(0,0,0,0.1)',
              color: selected !== null ? 'white' : 'var(--color-muted)',
              boxShadow: selected !== null ? '0 6px 24px rgba(222,49,99,0.35)' : 'none',
              cursor: selected !== null ? 'pointer' : 'not-allowed',
            }}
          >
            {t.submitAnswer}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full py-4 rounded-xl text-white font-semibold text-base transition-all duration-200 hover:scale-105"
            style={{
              fontFamily: "'Manrope', sans-serif",
              background: 'var(--color-primary)',
              boxShadow: '0 6px 24px rgba(222,49,99,0.35)',
            }}
          >
            {current + 1 < QUESTIONS.length ? t.nextQuestion : t.seeResults}
          </button>
        )}
      </div>
    </div>
  )
}
