import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Zap, Brain, Heart, Star } from "lucide-react";

const teslaNumbers = [3, 6, 9];
const grabovoiCodes = [
  { code: "17517038", purpose: "Unexpected Wealth", color: "from-yellow-500 to-amber-500" },
  { code: "73200180", purpose: "Unlimited Money", color: "from-green-500 to-emerald-500" },
  { code: "5207418", purpose: "Unexpected Money", color: "from-blue-500 to-cyan-500" },
  { code: "917604", purpose: "Quantum Jump", color: "from-purple-500 to-violet-500" }
];

const spiritualInsights = [
  "What Did I Do Right? (In that situation)",
  "What Would I Do Differently Next Time?",
  "Whatsoever and wherever my focus goes, that's what I'll see in my world",
  "Frequency: Align your frequency with your DR (Aim for Love - Peace - Joy)",
  "Act as if you're that person • Speak as if you're that person • Walk as if you're that person",
  "When you want to create something just do one thing and that's focus on it everyday",
  "Whatever you focus on, you energize into existence"
];

export function SpiritualSection() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950 to-purple-950"></div>
      
      {/* Tesla 3-6-9 Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        {teslaNumbers.map((num, i) => (
          <div
            key={num}
            className={`absolute text-9xl font-bold text-white`}
            style={{
              top: `${20 + i * 30}%`,
              left: `${10 + i * 25}%`,
              transform: 'rotate(-15deg)',
              fontSize: `${num * 3}rem`
            }}
          >
            {num}
          </div>
        ))}
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Star className="h-8 w-8 text-yellow-400 animate-pulse" />
            <h2 className="text-white text-4xl md:text-5xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Universal Codes & Wisdom
            </h2>
            <Star className="h-8 w-8 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Harnessing Tesla's sacred geometry and quantum healing frequencies to align technology with universal consciousness.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Tesla 3-6-9 Section */}
          <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm border border-blue-500/30 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="h-8 w-8 text-blue-400" />
              <h3 className="text-white text-2xl">Universe Wisdom</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              {teslaNumbers.map((num) => (
                <div key={num} className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-lg font-bold">{num}</span>
                  </div>
                  <p className="text-gray-300 text-xs">Sacred {num}</p>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 text-center">
              <p className="text-gray-300 italic text-sm">
                "If you only knew the magnificence of the 3, 6 and 9, then you would have the key to the universe." - Tesla
              </p>
              
              <div className="border-t border-blue-500/30 pt-4">
                <h4 className="text-blue-300 font-semibold mb-2">Frequency, Energy and Vibration</h4>
                <p className="text-gray-300 italic text-sm">
                  "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration." - Tesla
                </p>
              </div>
            </div>
          </Card>
          
          {/* Grabovoi Codes */}
          <Card className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 backdrop-blur-sm border border-emerald-500/30 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="h-8 w-8 text-emerald-400" />
              <h3 className="text-white text-2xl">Quantum Healing Codes</h3>
            </div>
            
            <div className="space-y-3">
              {grabovoiCodes.map((item) => (
                <div 
                  key={item.code} 
                  className="group flex items-center justify-between p-3 bg-gray-800/30 rounded-lg hover:bg-gray-700/40 transition-all duration-300 cursor-pointer"
                >
                  <Badge className={`bg-gradient-to-r ${item.color} text-white font-mono text-lg px-4 py-2 blur-sm group-hover:blur-none transition-all duration-300`}>
                    {item.code}
                  </Badge>
                  <span className="text-gray-300 text-sm blur-sm group-hover:blur-none transition-all duration-300">{item.purpose}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-xs italic">Hover to reveal the sacred codes</p>
            </div>
          </Card>
        </div>
        
        {/* Spiritual Insights */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-500/30 p-8">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Heart className="h-8 w-8 text-pink-400" />
            <h3 className="text-white text-2xl text-center">Manifestation Principles</h3>
            <Heart className="h-8 w-8 text-pink-400" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {spiritualInsights.map((insight, index) => (
              <div key={index} className="bg-gray-800/30 p-4 rounded-lg border-l-4 border-pink-400">
                <p className="text-gray-200 leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-pink-500/30 rounded-full px-8 py-4 inline-block">
              <p className="text-pink-300 text-lg font-semibold">
                IT IS SIMPLE. WHATEVER YOU FOCUS ON, YOU ENERGIZE INTO EXISTENCE.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}