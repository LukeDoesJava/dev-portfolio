import { useState } from 'react';

export default function Contact() {
  // Button hover states
  const [hoverStates, setHoverStates] = useState({
    resume: false,
    linkedin: false,
    github: false,
    email: false
  });

  const handleMouseEnter = (button: keyof typeof hoverStates) => {
    setHoverStates(prev => ({ ...prev, [button]: true }));
  };

  const handleMouseLeave = (button: keyof typeof hoverStates) => {
    setHoverStates(prev => ({ ...prev, [button]: false }));
  };

  // Button style based on hover state
  const getButtonStyle = (button: keyof typeof hoverStates) => {
    return `font-tusker px-6 sm:px-8 py-2 sm:py-3 rounded-full border-2 text-xs sm:text-sm tracking-wider transition-all duration-300 ${
      hoverStates[button] ? 'bg-primary text-black' : 'bg-transparent text-white'
    }`;
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 md:px-14 py-16 sm:py-20 md:py-24 relative flex flex-col justify-end">
      {/* LET'S CONNECT text */}
      <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 left-4 sm:left-8 md:left-16">
        <h2 className="font-tusker text-5xl sm:text-6xl md:text-[8rem] font-bold leading-[0.85] tracking-[-0.02em]">
          GET IN <br /><span className="text-primary">TOUCH</span> <span className="sm:inline block">WITH ME</span>
        </h2>
      </div>

      {/* Buttons container */}
      <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 right-4 sm:right-8 md:right-16 flex flex-col space-y-3 sm:space-y-4 md:space-y-6">
        <button 
          className={getButtonStyle('resume')}
          onMouseEnter={() => handleMouseEnter('resume')}
          onMouseLeave={() => handleMouseLeave('resume')}
          onClick={() => window.open('/resume', '_blank')}
        >
          RESUME
        </button>
        
        <button 
          className={getButtonStyle('linkedin')}
          onMouseEnter={() => handleMouseEnter('linkedin')}
          onMouseLeave={() => handleMouseLeave('linkedin')}
          onClick={() => window.open('https://www.linkedin.com/in/luke-p-edwards/', '_blank')}
        >
          LINKEDIN
        </button>
        
        <button 
          className={getButtonStyle('github')}
          onMouseEnter={() => handleMouseEnter('github')}
          onMouseLeave={() => handleMouseLeave('github')}
          onClick={() => window.open('https://github.com/LukeDoesJava', '_blank')}
        >
          GITHUB
        </button>
        
        <button 
          className={getButtonStyle('email')}
          onMouseEnter={() => handleMouseEnter('email')}
          onMouseLeave={() => handleMouseLeave('email')}
          onClick={() => window.location.href = 'mailto:luke0edwardss@gmail.com'}
        >
          EMAIL
        </button>
      </div>
      
      {/* Footer copyright */}
      <div className="absolute bottom-4 sm:bottom-6 w-full text-center text-xs sm:text-sm opacity-50">
        © {new Date().getFullYear()} • DESIGNED & BUILT WITH REACT
      </div>
    </div>
  );
}