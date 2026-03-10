import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
const CarDetails = lazy(() => import('./pages/CarDetails'))
const Contact = lazy(() => import('./pages/Contact'))
const About = lazy(() => import('./pages/About'))
const Privacy = lazy(() => import('./pages/Privacy'))
import AmbientBackground from './components/AmbientBackground'
import ParticleNetwork from './components/ParticleNetwork'
import LanguageRouter from './components/LanguageRouter'
import { DEFAULT_LANGUAGE } from './constants/languages'

export default function App() {
    return (
        <>
            <AmbientBackground />
            <ParticleNetwork />
            <Suspense fallback={null}>
                <Routes>
                    {/* Redirect root to default language */}
                    <Route path="/" element={<Navigate to={`/${DEFAULT_LANGUAGE}`} replace />} />

                    {/* Language-prefixed routes */}
                    <Route path="/:lang" element={<LanguageRouter />}>
                        <Route index element={<Home />} />
                        <Route path="car/:slug" element={<CarDetails />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="about" element={<About />} />
                        <Route path="privacy" element={<Privacy />} />
                    </Route>
                </Routes>
            </Suspense>
        </>
    )
}
