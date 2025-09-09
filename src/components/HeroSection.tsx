import { Button } from "./ui/button";
import { ArrowDown, Copy } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function HeroSection() {
  const copyEmail = () => {
    navigator.clipboard.writeText("your.email@example.com");
    toast.success("Email copied to clipboard!");
  };

  return (
    <section id="about" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <p className="text-gray-400 uppercase tracking-wider text-sm mb-6">
          DYNAMIC WEB DEVELOPMENT WITH MODERN TECHNOLOGIES
        </p>
        
        <h1 className="text-white mb-6">
          <span className="block text-4xl md:text-6xl lg:text-7xl">Transforming Concepts into</span>
          <span className="block text-4xl md:text-6xl lg:text-7xl">
            Seamless <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">User Experiences</span>
          </span>
        </h1>
        
        <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Hi! I'm a Full-Stack Developer with expertise in Python, JavaScript, and UI/UX Design, 
          passionate about creating efficient and user-friendly applications.
        </p>
        
        <Button 
          className="bg-transparent border border-gray-600 text-white hover:bg-white/10 px-8 py-6 rounded-full"
          onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Show my work <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      {/* Floating elements */}
      <div className="absolute bottom-20 left-20 hidden lg:block">
        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 max-w-sm">
          <h3 className="text-white text-lg mb-2">I'm very flexible with time</h3>
          <p className="text-gray-300 text-sm">zone communications & work with teams all around the world.</p>
        </div>
      </div>
    </section>
  );
}