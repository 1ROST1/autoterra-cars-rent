import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import AmbientBackground from './components/AmbientBackground'
import ParticleNetwork from './components/ParticleNetwork'
import AnalyticsTracker from './components/AnalyticsTracker'
import LanguageRouter from './components/LanguageRouter'
import { DEFAULT_LANGUAGE } from './constants/languages'

const CarDetails = lazy(() => import('./pages/CarDetails'))
const Contact = lazy(() => import('./pages/Contact'))
const About = lazy(() => import('./pages/About'))
const Privacy = lazy(() => import('./pages/Privacy'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
    return (
        <>
            <AnalyticsTracker />
            <AmbientBackground />
            <ParticleNetwork />
            <Suspense fallback={<div className="min-h-screen relative z-10" />}>
                <Routes>
                    <Route path="/" element={<Navigate to={`/${DEFAULT_LANGUAGE}/`} replace />} />

                    <Route path="/:lang" element={<LanguageRouter />}>
                        <Route index element={<Home />} />
                        <Route path="car/:slug" element={<CarDetails />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="about" element={<About />} />
                        <Route path="privacy" element={<Privacy />} />
                        <Route path="404" element={<NotFound />} />
                        <Route path="*" element={<Navigate to="404/" replace />} />
                    </Route>

                    <Route path="*" element={<Navigate to={`/${DEFAULT_LANGUAGE}/404/`} replace />} />
                </Routes>
            </Suspense>
        </>
    )
}
