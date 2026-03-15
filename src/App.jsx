import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Particles from './components/Particles'
import LandingPage from './pages/LandingPage'
import LanguagePage from './pages/LanguagePage'
import ModulesPage from './pages/ModulesPage'
import LessonPage from './pages/LessonPage'
import QuizPage from './pages/QuizPage'
import ProgressPage from './pages/ProgressPage'

function AppShell() {
  const { pathname } = useLocation()
  const showParticles = pathname !== '/'

  return (
    <>
      <Navbar />
      {showParticles && (
        <Particles
          particleColors={['#000000']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/language" element={<LanguagePage />} />
        <Route path="/modules" element={<ModulesPage />} />
        <Route path="/lesson/:id" element={<LessonPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/progress" element={<ProgressPage />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
