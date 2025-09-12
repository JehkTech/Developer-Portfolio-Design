import { Card } from "./ui/card";

const techStack = [
  { name: "Rust", category: "Lightning" },
  { name: "Solidity", category: "Blockchain" },
  { name: "Python", category: "Backend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Framework" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Elixir", category: "Backend" },
  { name: "Figma", category: "Design" },
  { name: "Git", category: "Tools" }
];

const currentProject = {
  title: "Currently building a Trading Journal",
  description: "Developing a comprehensive trading journal application with portfolio tracking and performance analytics.",
  codeSnippet: `// Trading Analytics Module
const analyzePerformance = (trades) => {
  const winRate = calculateWinRate(trades);
  const profitLoss = calculatePnL(trades);
  
  return {
    winRate,
    profitLoss,
    frequency: 369 // Tesla's sacred numbers
  };
};`
};

export function TechStackSection() {
  return (
    <section className="py-20 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Client Collaboration Card */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6">
              <h3 className="text-white text-xl mb-3">I prioritize client collaboration, fostering open communication</h3>
              <div className="w-full h-32 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg transform rotate-12"></div>
              </div>
            </Card>
            
            {/* Tech Enthusiasm Card */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6">
              <h3 className="text-white text-xl mb-3">Tech enthusiast with a passion for development.</h3>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-1">
                  <div className="h-2 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-600 rounded w-1/2"></div>
                  <div className="h-2 bg-gray-600 rounded w-2/3"></div>
                </div>
              </div>
            </Card>
            
            {/* CTA Card */}
            <Card className="bg-gradient-to-br from-amber-600 to-orange-600 p-6 text-center">
              <h3 className="text-white text-xl mb-2">⚡ Trading Expertise Available</h3>
              <p className="text-amber-100 text-sm mb-4">2 years of trading experience • Sacred geometry analysis</p>
              <button 
                className="bg-black/20 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full hover:bg-black/30 transition-colors flex items-center gap-2 mx-auto"
                onClick={() => {
                  navigator.clipboard.writeText("jeh@example.com");
                }}
              >
                📧 Request Appointment
              </button>
            </Card>
          </div>
          
          {/* Right Column */}
          <div className="space-y-8">
            {/* Tech Stack */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-gray-400 text-sm mb-2">I constantly try to improve</p>
                  <h3 className="text-white text-2xl">My tech stack</h3>
                </div>
                <div className="text-right">
                  <div className="text-gray-400 text-sm space-y-1">
                    <div>Express</div>
                    <div>Vue.js</div>
                    <div>Next.js</div>
                    <div>TypeScript</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {techStack.map((tech) => (
                  <div key={tech.name} className="bg-gray-800/50 p-3 rounded-lg">
                    <div className="text-white">{tech.name}</div>
                    <div className="text-gray-400 text-sm">{tech.category}</div>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Current Project */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6">
              <p className="text-gray-400 text-sm mb-2">The Inside Scoop</p>
              <h3 className="text-white text-xl mb-4">{currentProject.title}</h3>
              
              <div className="bg-gray-900/80 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
                  <code>{currentProject.codeSnippet}</code>
                </pre>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}