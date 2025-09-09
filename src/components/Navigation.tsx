import { Button } from "./ui/button";

export function Navigation() {
  const navItems = ["About", "Projects", "Experience", "Contact"];

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-gray-900/80 backdrop-blur-md rounded-full px-6 py-3 border border-gray-700/50">
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}