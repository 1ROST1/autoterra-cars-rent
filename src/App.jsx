import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import CarDetails from './pages/CarDetails'
import Contact from './pages/Contact'
import About from './pages/About'
import Privacy from './pages/Privacy'
import AmbientBackground from './components/AmbientBackground'
import ParticleNetwork from './components/ParticleNetwork'
import LanguageRouter from './components/LanguageRouter'
import { DEFAULT_LANGUAGE } from './constants/languages'

export default function App() {
    return (
        <>
            <AmbientBackground />
            <ParticleNetwork />
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
        </>
    )
}
