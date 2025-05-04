import { useState, useEffect } from 'react';

interface NavbarProps {
  onVisibilityChange?: (isVisible: boolean) => void;
}

const Navbar = ({ onVisibilityChange }: NavbarProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Add initial animation delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      onVisibilityChange?.(true);
    }, 500);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Calculate scroll progress
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScrollY / windowHeight) * 100;
      setScrollProgress(progress);

      // Hide/show navbar based on scroll direction
      const newIsVisible = currentScrollY <= lastScrollY || currentScrollY < 100;
      setIsVisible(newIsVisible);
      onVisibilityChange?.(newIsVisible);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [lastScrollY, onVisibilityChange]);

  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(`#${sectionId}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu if open
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div 
        className={`relative w-full transition-all duration-500 transform ${
          isVisible 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0'
        }`}
      >
        {/* Content */}
        <div className="relative px-4 sm:px-6 md:px-16">
          <nav className="flex justify-between items-center h-[70px] transition-all duration-500">
            {/* Logo */}
            <div className={`font-bold uppercase text-sm tracking-wider text-white transform transition-transform duration-500 ${
              isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            }`}>
              Luke Edwards
            </div>

            {/* Desktop Menu */}
            <div className={`hidden md:block font-bold uppercase text-sm tracking-wider text-white transform transition-all duration-500 delay-100 ${
              isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            }`}>
              FULLSTACK DEVELOPER
            </div>
            <div className="hidden md:flex font-bold space-x-4 text-sm tracking-wider">
              <button 
                onClick={() => scrollToSection('about')}
                className={`text-primary hover:opacity-80 transition-all duration-500 delay-200 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
                }`}
              >
                about
              </button>
              <span className={`text-white transition-all duration-500 delay-200 transform ${
                isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
              }`}>{`>`}</span>
              <button 
                onClick={() => scrollToSection('projects')}
                className={`text-primary hover:opacity-80 transition-all duration-500 delay-300 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
                }`}
              >
                projects
              </button>
              <span className={`text-white transition-all duration-500 delay-300 transform ${
                isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
              }`}>{`>`}</span>
              <button 
                onClick={() => scrollToSection('contact')}
                className={`text-primary hover:opacity-80 transition-all duration-500 delay-400 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
                }`}
              >
                reach me
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className={`md:hidden text-white p-2 transition-all duration-500 transform ${
                isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="space-y-2">
                <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-2.5' : ''}`} />
                <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-2.5' : ''}`} />
              </div>
            </button>
          </nav>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="py-4 space-y-4">
              <div className="text-center font-bold uppercase text-sm tracking-wider text-white">
                FULLSTACK DEVELOPER
              </div>
              <div className="flex flex-col items-center space-y-4 font-bold text-sm tracking-wider pb-4">
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-primary hover:opacity-80 transition-opacity"
                >
                  about
                </button>
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="text-primary hover:opacity-80 transition-opacity"
                >
                  projects
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-primary hover:opacity-80 transition-opacity"
                >
                  reach me
                </button>
              </div>
            </div>
          </div>

          {/* Separator Line */}
          <div className={`h-px bg-white/20 transform transition-transform duration-500 ${
            isVisible ? 'scale-x-100' : 'scale-x-0'
          }`}></div>

          {/* Progress Bar Container */}
          <div className="h-px w-full bg-white/10">
            {/* Progress Bar */}
            <div 
              className="h-full bg-white/70 transition-all duration-150 origin-left"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;