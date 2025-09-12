import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { TechStackSection } from "./components/TechStackSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { SpiritualSection } from "./components/SpiritualSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ContactSection } from "./components/ContactSection";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <TechStackSection />
      <ProjectsSection />
      <SpiritualSection />
      <ExperienceSection />
      <ContactSection />
      <Toaster 
        theme="dark" 
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            color: 'white',
          },
        }}
      />
      
      {/* Footer */}
      <footer className="bg-slate-950 py-8 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4">
            <p className="text-gray-400">
              © 2024 Jeh • Built with sacred geometry and quantum frequencies
            </p>
            <div className="flex gap-2 text-purple-400">
              <span>3</span>
              <span>6</span>
              <span>9</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}