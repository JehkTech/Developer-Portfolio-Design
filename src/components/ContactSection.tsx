import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function ContactSection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! I'll get back to you soon.");
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("jeh@jetech.dev");
    toast.success("Email copied to clipboard! ⚡");
  };

  return (
    <section id="contact" className="py-20 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-white text-4xl md:text-5xl mb-4">Let's Manifest Something Amazing</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Ready to merge technology with spiritual wisdom? Whether it's Lightning Network integration, 
            DeFi protocols, or trading systems - let's focus our energy and create abundance together! ⚡✨
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-slate-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6">
              <h3 className="text-white text-2xl mb-6">Get in Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <button 
                      onClick={copyEmail}
                      className="text-white hover:text-purple-400 transition-colors"
                    >
                      jeh@jetech.dev
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white">Zambia</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Available for</p>
                    <p className="text-white">Remote work & collaboration</p>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Social Links */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6">
              <h3 className="text-white text-xl mb-4">Connect with me</h3>
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="https://github.com/JehkTech" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800/50 hover:bg-purple-600/20 rounded-full flex items-center justify-center transition-colors mx-auto"
                >
                  <Github className="h-6 w-6 text-gray-400 hover:text-white" />
                </a>
                <a 
                  href="https://linkedin.com/in/jeh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800/50 hover:bg-blue-600/20 rounded-full flex items-center justify-center transition-colors mx-auto"
                >
                  <Linkedin className="h-6 w-6 text-gray-400 hover:text-white" />
                </a>
                <a 
                  href="https://instagram.com/jeh.tech" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800/50 hover:bg-pink-600/20 rounded-full flex items-center justify-center transition-colors mx-auto"
                >
                  <Instagram className="h-6 w-6 text-gray-400 hover:text-white" />
                </a>
                <a 
                  href="https://reddit.com/u/JehTech" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800/50 hover:bg-orange-600/20 rounded-full flex items-center justify-center transition-colors mx-auto"
                >
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">R</span>
                  </div>
                </a>
              </div>
            </Card>
          </div>
          
          {/* Contact Form */}
          <Card className="bg-gradient-to-br from-slate-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6">
            <h3 className="text-white text-2xl mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Name</label>
                  <Input 
                    placeholder="Your name"
                    className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Email</label>
                  <Input 
                    type="email"
                    placeholder="your.email@example.com"
                    className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Subject</label>
                <Input 
                  placeholder="Project collaboration"
                  className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
              
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Message</label>
                <Textarea 
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 resize-none"
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3"
              >
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}