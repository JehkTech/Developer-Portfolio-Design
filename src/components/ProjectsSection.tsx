import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Mamastops Cargo-Truck Marketplace",
    description: "Complete UI/UX design for a cargo-truck marketplace platform including user journey design, administrative dashboard, and service integrations.",
    tech: ["Figma", "UI/UX Design", "User Research", "Prototyping"],
    image: "figma design project",
    type: "Design Project"
  },
  {
    title: "Financial Platform Integration",
    description: "Contributed to critical business applications interfacing with government revenue collection systems at Probase Ltd.",
    tech: ["Python", "System Integration", "API Development", "Testing"],
    image: "financial system",
    type: "Full-Stack Development"
  },
  {
    title: "Python Education Platform",
    description: "Developed curriculum and taught Python programming bootcamp for junior developers, focusing on practical application and best practices.",
    tech: ["Python", "Education", "Curriculum Design", "Mentoring"],
    image: "education coding",
    type: "Education & Training"
  },
  {
    title: "Responsive Web Applications",
    description: "Built and enhanced multiple web applications with focus on responsive design, user experience, and cross-browser compatibility.",
    tech: ["JavaScript", "HTML/CSS", "Responsive Design", "Testing"],
    image: "web development",
    type: "Frontend Development"
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-white text-4xl md:text-5xl mb-4">Featured Projects</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of my work spanning full-stack development, UI/UX design, 
            and technical education across various industries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <ExternalLink className="h-5 w-5" />
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <Github className="h-5 w-5" />
                    </button>
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