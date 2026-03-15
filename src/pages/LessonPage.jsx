import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { lessonTranslations } from '../data/lessonTranslations'
import { uiTranslations } from '../data/uiTranslations'

const LESSONS = {
  'upi-basics': {
    icon: '💳',
    title: 'UPI Basics',
    module: 'UPI Basics',
    color: 'rgba(222,49,99,0.08)',
    sections: [
      {
        heading: 'What is UPI?',
        content: `UPI stands for Unified Payments Interface. It is a system that allows you to instantly transfer money between bank accounts using your mobile phone — any time of day, seven days a week.

You don't need to remember long bank account numbers. All you need is a UPI ID, which looks like your phone number or name followed by "@upi" (for example: 9876543210@upi).`,
      },
      {
        heading: 'How to send money safely',
        content: `Step 1: Open any UPI app on your phone (PhonePe, Google Pay, Paytm, or your bank's own app).

Step 2: Tap "Send Money" or "Pay".

Step 3: Enter the receiver's UPI ID or scan their QR code.

Step 4: Enter the amount you want to send.

Step 5: Enter your 4 or 6 digit UPI PIN to confirm.

Important: Never share your UPI PIN with anyone — not even bank officials. Your PIN is private and secret.`,
      },
      {
        heading: 'Things to remember',
        content: `✦ Always double-check the name of the person before confirming payment.

✦ For receiving money, you do NOT need to enter your PIN.

✦ If you receive a call asking for your PIN or OTP, that is a scam. Hang up immediately.

✦ Keep your UPI app updated to get the latest security features.`,
      },
    ],
  },
  'digital-safety': {
    icon: '🔐',
    title: 'Digital Safety',
    module: 'Digital Safety',
    color: 'rgba(246,166,178,0.15)',
    sections: [
      {
        heading: 'Why digital safety matters',
        content: `As you use your phone more for business and banking, it's important to keep yourself protected. Fraudsters often target first-time digital users with fake calls, messages, and links.

This lesson will help you recognise common scams and protect your money and identity.`,
      },
      {
        heading: 'Common scams to watch out for',
        content: `KYC Scam: Someone calls saying your bank account or UPI will be blocked unless you share your OTP or PIN. This is always a scam.

Fake Customer Care: Fraudsters search social media and call pretending to be customer support. Always find official numbers from the back of your bank card.

Lottery / Prize: Messages saying you've won a prize but need to pay fees first. These are always fake.

Fake Links: Messages with links that look like they are from banks or government. Don't click unknown links.`,
      },
    ],
  },
  'online-selling': {
    icon: '🛒',
    title: 'Online Selling',
    module: 'Online Selling',
    color: 'rgba(13,27,42,0.05)',
    sections: [
      {
        heading: 'Start selling online today',
        content: `You don't need a website to start selling online. Millions of women entrepreneurs in India use WhatsApp, Instagram, and platforms like Meesho to sell their products.

This lesson will show you step-by-step how to set up your first online shop.`,
      },
    ],
  },
  'business-finance': {
    icon: '📊',
    title: 'Business Finance',
    module: 'Business Finance',
    color: 'rgba(222,49,99,0.05)',
    sections: [
      {
        heading: 'Managing your business money',
        content: `Good financial management is the foundation of a growing business. This lesson covers the basics: tracking income and expenses, setting prices, and understanding profit.`,
      },
    ],
  },
}

/* ---- Language → SpeechSynthesis BCP 47 tag mapping ---- */
const VOICE_LANG = { en: 'en-US', hi: 'hi-IN', te: 'hi-IN' }

function playVoice(text, language = 'en') {
  const langTag = VOICE_LANG[language] || 'en-US'

  const speech = new SpeechSynthesisUtterance(text)
  speech.lang = langTag
  speech.rate = 0.9
  speech.pitch = 1

  // Pick a voice whose lang matches the target language tag
  const voices = window.speechSynthesis.getVoices()
  const match = voices.find(v => v.lang === langTag)
    || voices.find(v => v.lang.startsWith(langTag.split('-')[0]))
  if (match) {
    speech.voice = match
  }

  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(speech)

  return speech
}

export default function LessonPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const lesson = LESSONS[id] || LESSONS['upi-basics']

  /* ---- Read persisted language (default: 'en') ---- */
  const language = localStorage.getItem('tara-language') || 'en'
  const t = uiTranslations[language] || uiTranslations.en

  const [playing, setPlaying] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
  const [showChat, setShowChat] = useState(false)
  const [chatMsg, setChatMsg] = useState('')
  const [chatHistory, setChatHistory] = useState([
    { from: 'tara', text: `Hi! I'm Tara 🌸 Ask me anything about ${lesson.title}.` },
  ])
  const [lessonText, setLessonText] = useState('')

  // --------------------------------------------------
  // Local translation lookup — runs ONLY when `id` or
  // `language` changes.  No network calls at all.
  //
  // English  → preset text from LESSONS
  // hi / te  → predefined translation from lessonTranslations
  // missing  → falls back to English preset
  // --------------------------------------------------
  useEffect(() => {
    // Build the full English preset text from all sections
    const presetText = lesson.sections
      .map(s => `${s.heading}\n${s.content}`)
      .join('\n\n')

    if (language === 'en') {
      setLessonText(presetText)
      return
    }

    // Look up predefined translation
    const translated = lessonTranslations[id]?.[language]

    if (translated) {
      setLessonText(translated)
    } else {
      setLessonText(presetText)
    }
  }, [id, language])

  // Cancel any playing speech when section changes or component unmounts
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel()
      setPlaying(false)
    }
  }, [activeSection])

  function handlePlayVoice() {
    if (playing) {
      window.speechSynthesis.cancel()
      setPlaying(false)
      return
    }

    // Use the AI‑generated text if available, otherwise fall back to
    // the static section content.
    const textToSpeak = lessonText || lesson.sections[activeSection].content
    const speech = playVoice(textToSpeak, language)

    setPlaying(true)

    speech.onend = () => setPlaying(false)
    speech.onerror = () => setPlaying(false)
  }

  function handleNextLesson() {
    localStorage.setItem('current-module', id)
    navigate(`/quiz?module=${id}`)
  }

  function handleSendChat(e) {
    e.preventDefault()
    if (!chatMsg.trim()) return
    const userMsg = chatMsg.trim()
    setChatHistory(h => [...h, { from: 'user', text: userMsg }])
    setChatMsg('')
    setTimeout(() => {
      setChatHistory(h => [
        ...h,
        {
          from: 'tara',
          text: `That's a great question! In ${lesson.title}, we cover ${userMsg.split(' ').slice(0, 3).join(' ')} and more. Keep learning — you're doing amazing! 🌟`,
        },
      ])
    }, 900)
  }

  return (
    <div
      className="min-h-screen pt-24 pb-32 px-6"
      style={{
        background: `
          radial-gradient(ellipse 50% 50% at 90% 10%, rgba(222,49,99,0.06) 0%, transparent 60%),
          var(--color-bg)
        `,
      }}
    >
      <div className="max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <div className="anim-1 flex items-center gap-2 text-xs mb-8" style={{ color: 'var(--color-muted)', fontFamily: "'Manrope', sans-serif" }}>
          <button onClick={() => navigate('/modules')} className="hover:underline">Modules</button>
          <span>›</span>
          <span style={{ color: 'var(--color-text)' }}>{lesson.module}</span>
        </div>

        {/* Lesson header */}
        <div className="anim-2 flex items-start gap-4 mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
            style={{ background: lesson.color }}
          >
            {lesson.icon}
          </div>
          <div>
            <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-primary)', fontFamily: "'Manrope', sans-serif" }}>
              LESSON
            </p>
            <h1
              className="text-3xl"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: 'var(--color-navy)' }}
            >
              {lesson.title}
            </h1>
          </div>
        </div>

        {/* Section tabs */}
        {lesson.sections.length > 1 && (
          <div className="anim-3 flex gap-2 flex-wrap mb-8">
            {lesson.sections.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveSection(i)}
                className="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  background: activeSection === i ? 'var(--color-primary)' : 'white',
                  color: activeSection === i ? 'white' : 'var(--color-muted)',
                  boxShadow: activeSection === i
                    ? '0 4px 12px rgba(222,49,99,0.3)'
                    : '0 1px 6px rgba(0,0,0,0.06)',
                }}
              >
                {i + 1}. {s.heading}
              </button>
            ))}
          </div>
        )}

        {/* Lesson content */}
        <div
          className="anim-4 rounded-2xl p-8 mb-6"
          style={{
            background: 'white',
            boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
          }}
        >
          <h2
            className="text-xl mb-5"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, color: 'var(--color-navy)' }}
          >
            {lesson.sections[activeSection].heading}
          </h2>
          <div
            className="text-sm leading-[1.9] whitespace-pre-line"
            style={{ color: 'var(--color-text)', fontFamily: "'Manrope', sans-serif" }}
          >
            {lesson.sections[activeSection].content}
          </div>
        </div>

        {/* AI Explanation */}
        <div
          className="anim-5 rounded-2xl p-6 mb-8"
          style={{
            background: 'rgba(222,49,99,0.04)',
            border: '1.5px solid rgba(222,49,99,0.12)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">✨</span>
            <span
              className="text-xs font-semibold"
              style={{ color: 'var(--color-primary)', fontFamily: "'Manrope', sans-serif" }}
            >
              TARA Explains
            </span>
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--color-text)', fontFamily: "'Manrope', sans-serif" }}
          >
            {lessonText}
          </p>
        </div>

        {/* Action buttons */}
        <div className="anim-6 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handlePlayVoice}
            className="flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-semibold text-sm transition-all duration-200"
            style={{
              fontFamily: "'Manrope', sans-serif",
              background: playing ? 'rgba(222,49,99,0.08)' : 'white',
              color: 'var(--color-navy)',
              border: '1.5px solid rgba(13,27,42,0.1)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(222,49,99,0.12)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)' }}
          >
            <span className="text-xl">{playing ? '🔊' : '🎙'}</span>
            {playing ? t.playingVoice : t.playVoice}
          </button>

          <button
            onClick={handleNextLesson}
            className="flex-1 flex items-center justify-center gap-3 py-4 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:scale-105"
            style={{
              fontFamily: "'Manrope', sans-serif",
              background: 'var(--color-primary)',
              boxShadow: '0 6px 24px rgba(222,49,99,0.35)',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(246,166,178,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(222,49,99,0.35)' }}
          >
            {t.takeQuiz}
          </button>
        </div>

        {/* Progress indicator */}
        <div className="mt-8 flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full" style={{ background: 'rgba(222,49,99,0.1)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                background: 'var(--color-primary)',
                width: `${((activeSection + 1) / lesson.sections.length) * 100}%`,
              }}
            />
          </div>
          <span
            className="text-xs font-semibold"
            style={{ color: 'var(--color-muted)', fontFamily: "'Manrope', sans-serif" }}
          >
            {activeSection + 1}/{lesson.sections.length}
          </span>
        </div>
      </div>

      {/* Floating Ask Tara button */}
      <button
        onClick={() => setShowChat(c => !c)}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full text-white flex items-center justify-center text-2xl transition-all duration-200 hover:scale-110 pulse-ring"
        style={{
          background: 'var(--color-primary)',
          boxShadow: '0 8px 24px rgba(222,49,99,0.5)',
          zIndex: 50,
        }}
        title="Ask Tara"
      >
        💬
      </button>

      {/* Chat panel */}
      {showChat && (
        <div
          className="fixed bottom-28 right-8 w-80 rounded-2xl overflow-hidden z-50"
          style={{
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            animation: 'fadeSlideUp 0.3s ease forwards',
          }}
        >
          {/* Chat header */}
          <div
            className="px-5 py-4 flex items-center justify-between"
            style={{ background: 'var(--color-navy)' }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                style={{ background: 'var(--color-primary)', color: 'white', fontFamily: "'Fraunces', serif" }}
              >
                T
              </div>
              <div>
                <div className="text-white text-sm font-semibold" style={{ fontFamily: "'Fraunces', serif" }}>
                  Ask Tara
                </div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Always here to help</div>
              </div>
            </div>
            <button onClick={() => setShowChat(false)} className="text-white opacity-50 hover:opacity-100 text-lg">×</button>
          </div>

          {/* Chat messages */}
          <div
            className="p-4 flex flex-col gap-3 overflow-y-auto"
            style={{ background: 'white', maxHeight: '260px' }}
          >
            {chatHistory.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className="max-w-[80%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    background: msg.from === 'user' ? 'var(--color-primary)' : 'rgba(222,49,99,0.07)',
                    color: msg.from === 'user' ? 'white' : 'var(--color-text)',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat input */}
          <form onSubmit={handleSendChat} className="flex gap-2 p-3" style={{ background: 'white', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <input
              value={chatMsg}
              onChange={e => setChatMsg(e.target.value)}
              placeholder="Ask a question…"
              className="flex-1 px-3 py-2 rounded-xl text-xs outline-none"
              style={{
                background: 'var(--color-bg)',
                border: '1.5px solid rgba(222,49,99,0.15)',
                fontFamily: "'Manrope', sans-serif",
                color: 'var(--color-text)',
              }}
            />
            <button
              type="submit"
              className="px-3 py-2 rounded-xl text-white text-xs font-semibold"
              style={{ background: 'var(--color-primary)' }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
