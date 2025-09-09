import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const experiences = [
  {
    title: "Software Developer Intern",
    company: "Probase Ltd",
    period: "August 2024 – May 2025",
    description: "Contributed to the development and deployment of critical business applications interfacing with financial platforms for government revenue collection.",
    skills: ["Full-Stack Development", "Python", "System Integration", "Technical Writing"],
    gradient: "from-blue-500/20 to-purple-500/20",
    iconColor: "bg-blue-500"
  },
  {
    title: "Technical Support Intern",
    company: "Mamastops",
    period: "2024",
    description: "Led UI/UX design for multiple platforms including Cargo-Truck Marketplace, designed complete user journeys and administrative dashboards.",
    skills: ["UI/UX Design", "Figma", "User Journey", "Quality Assurance"],
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "bg-purple-500"
  },
  {
    title: "Python Development Bootcamp Tutor",
    company: "Genius Education Zambia",
    period: "February 2024 – June 2024",
    description: "Facilitated comprehensive Python programming bootcamp, translating complex coding concepts into accessible lessons for junior tech professionals.",
    skills: ["Python", "Teaching", "Curriculum Design", "Mentoring"],
    gradient: "from-green-500/20 to-blue-500/20",
    iconColor: "bg-green-500"
  },
  {
    title: "Web Development Intern",
    company: "Oasis Infobyte & Code Alpha",
    period: "May 2023 – November 2023",
    description: "Gained extensive hands-on experience in web technologies, collaborated on website functionality improvements with focus on responsive design.",
    skills: ["HTML/CSS", "JavaScript", "Responsive Design", "Debugging"],
    gradient: "from-orange-500/20 to-red-500/20",
    iconColor: "bg-orange-500"
  }
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-white text-4xl md:text-5xl mb-4">My work experience</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Building innovative solutions and growing expertise across full-stack development, 
            UI/UX design, and technical leadership.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((exp, index) => (
            <Card key={index} className={`bg-gradient-to-br ${exp.gradient} backdrop-blur-sm border border-gray-700/50 p-6 hover:scale-105 transition-transform duration-300`}>
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full ${exp.iconColor} flex items-center justify-center flex-shrink-0`}>
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-white text-xl mb-1">{exp.title}</h3>
                  <p className="text-purple-300 mb-1">{exp.company}</p>
                  <p className="text-gray-400 text-sm">{exp.period}</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-gray-800/50 text-gray-300 hover:bg-gray-700/50">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}