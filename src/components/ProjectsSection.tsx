import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Trading Journal & Analytics Platform",
    description: "Full-stack trading journal with real-time portfolio tracking, performance analytics, and risk management tools. Features Tesla's 3-6-9 sacred geometry in chart patterns.",
    tech: ["React", "Node.js", "PostgreSQL", "Chart.js", "WebSocket"],
    image: "trading dashboard",
    type: "Full-Stack • Trading",
    github: "https://github.com/JehkTech/r0tk_journal",
    live: "#"
  },
  {
    title: "Lightning Network Payment Gateway",
    description: "High-performance Lightning Network payment processor built with Rust. Enables instant Bitcoin microtransactions with minimal fees for web applications.",
    tech: ["Rust", "Lightning", "Bitcoin", "WebAssembly", "gRPC"],
    image: "lightning network",
    type: "Blockchain • Lightning",
    github: "https://github.com/JehkTech/lightning-gateway",
    live: "#"
  },
  {
    title: "DeFi Smart Contracts Suite",
    description: "Comprehensive DeFi protocol with yield farming, staking, and governance features. Implements quantum healing frequencies in tokenomics design.",
    tech: ["Solidity", "Hardhat", "OpenZeppelin", "Chainlink", "IPFS"],
    image: "defi protocol",
    type: "Smart Contracts • DeFi",
    github: "https://github.com/JehkTech/defi-suite",
    live: "#"
  },
  // {
  //   title: "Quantum Manifestation App",
  //   description: "Mobile app combining Grabovoi codes, Tesla frequencies, and meditation timers. Built with Elixir backend for real-time synchronization.",
  //   tech: ["React Native", "Elixir", "Phoenix", "PostgreSQL", "WebRTC"],
  //   image: "manifestation app",
  //   type: "Mobile • Spiritual Tech",
  //   github: "https://github.com/JehkTech/quantum-manifest",
  //   live: "#"
  // },
  {
    title: "Cargo-Truck Marketplace UI/UX",
    description: "Complete design system for logistics platform with driver matching, route optimization, and real-time tracking. Incorporates sacred geometry in interface design.",
    tech: ["Figma", "Design System", "Prototyping", "User Research"],
    image: "logistics design",
    type: "UI/UX Design",
    github: "https://github.com/JehkTech/Mamastops-Cargo-Truck-Marketplace",
    live: "#"
  },
  {
    title: "Frequency Healing Web App",
    description: "Web application for sound therapy using specific frequencies for chakra alignment and manifestation. Features binaural beats generator.",
    tech: ["TypeScript", "Web Audio API", "React", "Tailwind CSS"],
    image: "sound therapy",
    type: "Web App • Healing",
    github: "https://github.com/JehkTech/frequency-healer",
    live: "#"
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-white text-4xl md:text-5xl mb-4">Featured Projects</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            A showcase of my work spanning Lightning & Bitcoin development, DeFi protocols, 
            trading systems, and spiritual technology applications. Each project integrates 
            sacred geometry and quantum principles.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="bg-gradient-to-br from-slate-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 overflow-hidden hover:scale-105 transition-transform duration-300">
              <div className="h-48 bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg mx-auto mb-3"></div>
                  <p className="text-gray-300 text-sm">{project.image}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                    {project.type}
                  </Badge>
                  <div className="flex gap-2">
                    <a href={project.live} className="text-gray-400 hover:text-white transition-colors">
                      <ExternalLink className="h-5 w-5" />
                    </a>
                    <a href={project.github} className="text-gray-400 hover:text-white transition-colors">
                      <Github className="h-5 w-5" />
                    </a>
                  </div>
                </div>
                
                <h3 className="text-white text-xl mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="outline" className="border-gray-600 text-gray-300">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}