import { Button } from "./ui/button";

export function Navigation() {
  const navItems = ["About", "Projects", "Spiritual", "Experience", "Contact"];

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-gradient-to-r from-gray-900/80 via-purple-900/50 to-gray-900/80 backdrop-blur-md rounded-full px-6 py-3 border border-purple-500/30">
        <div className="flex items-center gap-8">
          {navItems.map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-purple-300 transition-all duration-300 text-sm hover:scale-110 transform"
              style={{
                textShadow: index === 2 ? '0 0 10px rgba(168, 85, 247, 0.5)' : 'none'
              }}
            >
              {item === "Spiritual" ? "✨ " + item : item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}