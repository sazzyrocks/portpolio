import { BackgroundCanvas } from "./components/BackgroundCanvas"
import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { AboutEditorial } from "./components/AboutEditorial"
import { ProjectsShowcase } from "./components/ProjectsShowcase"
import { SkillsMatrix } from "./components/SkillsMatrix"
import { Chronicle } from "./components/Chronicle"
import { ContactSection } from "./components/ContactSection"
import { Footer } from "./components/Footer"

export function App() {
  return (
    <div className="relative min-h-screen bg-ambient-grain">
      {/* Background Interactive Ambient Canvas */}
      <BackgroundCanvas />

      {/* Navigation Masthead */}
      <Navbar />

      {/* Main Content Layout */}
      <main className="relative z-10">
        <Hero />
        <AboutEditorial />
        <ProjectsShowcase />
        <SkillsMatrix />
        <Chronicle />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
