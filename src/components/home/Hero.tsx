import { useState, useEffect, useRef } from 'react';
import Navbar from '../shared/Navbar';
import AboutMe from './AboutMe';
import Projects from './Projects';
import placeholderImage from '../../assets/images/placeholder.png';
import Contact from './Contact';

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [diamondState, setDiamondState] = useState({
    size: 145,
    visible: true,
    fixed: false
  });
  const lastScrollY = useRef(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Handle hero section opacity
      const startDim = 0;
      const endDim = windowHeight * 1.6;
      const opacity = Math.min(Math.max((scrollPosition - startDim) / (endDim - startDim), 0), 0.8);
      setScrollOpacity(opacity);

      // Diamond visibility logic
      const heroEndPosition = windowHeight * 1.7;
      const projectsStartPosition = windowHeight * 3.0;
      
      if (scrollPosition < heroEndPosition) {
        // In Hero section - diamond shrinks based on scroll
        const newSize = 145 - (opacity * 160);
        setDiamondState({
          size: newSize,
          visible: true,
          fixed: false
        });
      } else if (scrollPosition >= heroEndPosition && scrollPosition < projectsStartPosition) {
        // In About Me section - diamond stays fixed at minimum size
        setDiamondState({
          size: 0,
          visible: true,
          fixed: true
        });
      } else {
        // Past About Me section - diamond disappears
        setDiamondState({
          size: 50,
          visible: false,
          fixed: false
        });
      }

      // Only prevent scrolling up past hero section
      if (scrollPosition <= 0 && lastScrollY.current > 0) {
        window.scrollTo(0, 0);
      }
      
      lastScrollY.current = scrollPosition;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavbarVisibilityChange = (isVisible: boolean) => {
    setIsNavbarVisible(isVisible);
  };

  return (
    <div className="relative">
      {/* Background Container */}
      <div className="fixed inset-0 bg-[#121212] z-0">
        {/* Image with Diamond Mask */}
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${diamondState.visible ? '' : 'opacity-0'}`}
          style={{
            backgroundImage: `url(${placeholderImage})`,
            transform: `scale(${1 + scrollOpacity * 0.015})`,
            clipPath: `polygon(
              80% ${50 - diamondState.size * 1.3}%, 
              ${80 + diamondState.size * 1.3}% 50%, 
              80% ${50 + diamondState.size * 1.3}%, 
              ${80 - diamondState.size * 1.3}% 50%
            )`,
            transition: 'transform 0.1s ease-out, clip-path 0.3s ease-out, opacity 0.3s ease-out'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-white">
        {/* Blur Effect for Navbar Area */}
        <div 
          className={`fixed top-0 left-0 right-0 h-[70px] backdrop-blur-md z-40 transition-all duration-500 ${
            isNavbarVisible ? 'opacity-100' : 'opacity-0'
          }`} 
        />
        
        <Navbar onVisibilityChange={handleNavbarVisibilityChange} />

        {/* Hero Section */}
        <div className="relative min-h-screen px-4 sm:px-8 md:px-14">
          {/* Left Side - Title */}
          <div className="absolute top-20 sm:top-auto sm:bottom-12 md:bottom-4 lg:bottom-16 left-4 sm:left-8 md:left-16 w-full sm:w-auto">
            <span className="font-tusker text-primary font-bold text-base sm:text-lg md:text-xl mb-1 sm:mb-2 block opacity-0 animate-slide-up">developer</span>
            <div className="flex flex-col overflow-hidden">
              <div className="flex items-baseline gap-1 sm:gap-2 md:gap-6">
                <h1 className="font-tusker text-[3rem] xs:text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[12rem] font-bold leading-[0.85] tracking-[-0.06em] opacity-0 animate-slide-up">
                  FULLSTACK
                </h1>
                <span className="font-tusker text-primary text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-6xl opacity-0 animate-slide-up delay-200">&</span>
              </div>
              <h1 className="font-tusker text-[3rem] xs:text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[12rem] font-bold leading-[0.85] tracking-[-0.06em] mb-0 opacity-0 animate-slide-up delay-200">
                SYSTEMS
              </h1>   
            </div>
          </div>

          {/* Right Side - Description */}
          <div className="absolute bottom-10 xs:bottom-16 sm:bottom-16 md:bottom-4 lg:bottom-16 right-4 sm:right-8 md:right-16 w-full sm:w-[70%] md:w-[50%] lg:w-[400px]">
            <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 mb-0">
              <p className="text-right font-semibold text-sm xs:text-base sm:text-lg md:text-lg leading-relaxed tracking-wide">
                I AM A FULLSTACK DEVELOPER BASED IN VICTORIA, BC. CURRENTLY SEEKING MY FIRST SOFTWARE ENGINEERING POSITION. I LOVE BRUTALIST DESIGN, BASKETBALL, AND MAKING SILLY PROJECTS IN TYPESCRIPT.
              </p>
              <div className="text-right">
                <button 
                  className={`font-tusker px-4 xs:px-6 sm:px-8 py-2 sm:py-3 rounded-full border-2 text-xs sm:text-sm tracking-wider transition-all duration-300 ${
                    isHovered ? 'bg-primary text-black' : 'bg-transparent text-white'
                  }`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => {
                    const contactSection = document.querySelector('#contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  CONTACT ME
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer for scroll effect */}
        <div className="h-[70vh]"></div>

        {/* About Section */}
        <div id="about" className="relative z-20">
          <AboutMe />
        </div>

        {/* Projects Section */}
        <div id="projects" className="relative z-30 bg-[#121212]">
          <Projects />
        </div>

        {/* Contact Section with Background Image */}
        <div id="contact" className="relative z-40">
          {/* Background Image for Contact Section */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${placeholderImage})`,
              opacity: 0.8
            }}
          />
          
          {/* Gradient Overlay to blend with Projects section */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-[#121212] to-transparent"
            style={{
              height: '400px'
            }}
          />
          
          {/* Overlay to ensure text is readable */}
          <div className="absolute inset-0 bg-opacity-40" />
          
          {/* Content with a semi-transparent background */}
          <div className="relative">
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
}