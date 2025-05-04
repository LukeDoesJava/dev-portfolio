import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { projects, Project } from '../../data/projects';
import AnimatedComingSoon from './AnimatedComingSoon';
import appstore from '../../assets/images/appstore.png';
import PolaroidFrame from './PolaroidFrame';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  
  useEffect(() => {
    const containerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.15,
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    if (containerRef.current) {
      containerObserver.observe(containerRef.current);
    }

    return () => containerObserver.disconnect();
  }, []);

  // Setup intersection observer for first project
  useEffect(() => {
    const firstProjectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShouldAnimate(true);
            firstProjectObserver.disconnect();
          }
        });
      },
      {
        threshold: 0.5
      }
    );

    const firstProject = projectRefs.current[0];
    if (firstProject) {
      firstProjectObserver.observe(firstProject);
    }

    return () => firstProjectObserver.disconnect();
  }, []);

  // Setup intersection observer
  useEffect(() => {
    const observers = projectRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.intersectionRatio > 0.5) {
              setActiveProject(index);
            }
          });
        },
        {
          rootMargin: '-20% 0px -20% 0px',
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }
      );

      if (ref) {
        observer.observe(ref);
      }

      return observer;
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [projects.length]);
  
  // Scroll to project function
  const scrollToProject = (index: number) => {
    const ref = projectRefs.current[index];
    if (ref) {
      ref.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  // Render iPhone mockup with enhanced 3D look
  const renderIPhoneMockup = (content: string, position: 'front' | 'back', isVideo?: boolean) => {
    return (
      <div className={`absolute w-[280px] h-[580px] transform 
        ${position === 'front' 
          ? 'translate-x-[400px] -translate-y-8 z-20' 
          : 'translate-x-[80px] translate-y-8 z-10'}
        transition-all duration-500 hover:scale-105`}>
        {/* Phone frame with enhanced 3D depth and shadows */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#202020] to-[#15181d] rounded-[3rem] shadow-xl 
          border border-gray-800 transform perspective-1000 
          hover:rotate-y-1 hover:rotate-x-2 transition-transform duration-500">
          
          {/* Side edge detail */}
          <div className="absolute inset-0 border-[6px] border-[#2a2f3c] rounded-[3rem] opacity-50"></div>
          
          {/* Top notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[130px] h-[34px] bg-[#0a0a0a] rounded-b-[1.2rem] z-30">
            {/* Camera and speaker details */}
            <div className="absolute top-[10px] left-[30px] w-[10px] h-[10px] rounded-full bg-[#1a1a1a] shadow-inner flex items-center justify-center">
              <div className="w-[6px] h-[6px] rounded-full bg-[#0a0a0a] border border-[#333]"></div>
            </div>
            <div className="absolute top-[10px] left-[55px] w-[40px] h-[6px] rounded-full bg-[#1a1a1a]"></div>
          </div>
          
          {/* Screen with border radius matching inner frame */}
          <div className="absolute inset-0 m-[12px] rounded-[2.5rem] overflow-hidden bg-black shadow-inner">
            {/* Screen content */}
            {isVideo ? (
              <iframe
                src={content}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img
                src={content || "/placeholder-image.png"}
                alt="iPhone screenshot"
                className="w-full h-full object-cover"
              />
            )}
            
            {/* Subtle screen reflections */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-30 pointer-events-none"></div>
          </div>
          
        </div>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen px-8 md:px-16 py-32 overflow-hidden"
    >
      {/* Progress Sidebar */}
      <div className={`fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="flex flex-col items-center">
          {projects.map((project: Project, index: number) => (
            <div key={index} className="flex flex-col items-center">
              {/* Line before node (except first node) */}
              {index > 0 && (
                <div 
                  className={`w-[2px] h-12 ${
                    index <= activeProject ? 'bg-primary' : 'bg-white/20'
                  } transition-colors duration-500`}
                />
              )}
              
              {/* Node and Title Container */}
              <button
                onClick={() => scrollToProject(index)}
                className="flex items-center gap-4"
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    index === activeProject 
                      ? 'border-white bg-primary' 
                      : index < activeProject 
                        ? 'border-white bg-primary' 
                        : 'border-white bg-transparent'
                  } transition-all duration-500 hover:scale-125 cursor-pointer`}
                />
                <span className="text-white text-sm font-tusker">
                  {project.title}
                </span>
              </button>
              
              {/* Line after node (except last node) */}
              {index < projects.length - 1 && (
                <div 
                  className={`w-[2px] h-12 ${
                    index < activeProject ? 'bg-primary' : 'bg-white/20'
                  } transition-colors duration-500`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Projects */}
      <div className="max-w-7xl mx-auto">
        {projects.map((project: Project, index: number) => (
          <div 
            key={project.title}
            ref={el => projectRefs.current[index] = el}
            className={`relative mb-96 transition-all duration-500 ${
              index === activeProject ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'
            }`}
          >
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              {project.screenshots ? (
                project.title === "Krumbz" ? (
                  // Enhanced iPhone visualization for Krumbz with 3D effect
                  <div className="relative w-full lg:w-4/5 h-[600px] perspective-1000 transform-gpu">
                    {/* Subtle platform shadow */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[500px] h-[20px] 
                         bg-black/20 blur-xl rounded-full z-0"></div>
                         
                    {/* Background iPhone */}
                    {renderIPhoneMockup(project.screenshots?.[0] || "/placeholder-image.png", 'back', false)}
                    
                    {/* Foreground iPhone */}
                    {renderIPhoneMockup(project.youtubeUrl || "/placeholder-image.png", 'front', true)}

                    {/* Animated Coming Soon SVG */}
                    <div className="hidden lg:flex lg:flex-col lg:items-center lg:absolute lg:right-[50px] lg:bottom-[-40px] lg:gap-8">
                      <AnimatedComingSoon shouldAnimate={shouldAnimate} />
                    </div>
                    <div className="hidden lg:flex lg:flex-col lg:items-center lg:absolute lg:right-[-330px] lg:bottom-[-75px] lg:gap-8">
                      <img 
                        src={appstore} 
                        alt="App Store" 
                        className={`w-24 h-24 hover:scale-110 transition-transform cursor-pointer appstore-fade-in ${shouldAnimate ? 'animate' : ''}`}
                      />
                    </div>
                  </div>
                ) : project.title === "Custom Claw Machine" ? (
                  // Polaroid visualization for Custom Claw Machine
                  <div className="relative w-full lg:w-1/2 h-[600px] flex items-center justify-center">
                    <div className="transform rotate-3 hover:rotate-6 transition-transform duration-300">
                      <PolaroidFrame
                        imageUrl={project.screenshots?.[0] || "/placeholder-image.png"}
                        rotation={0}
                      />
                    </div>
                  </div>
                ) : (
                  // Computer visualization for other projects
                  <div className="relative w-full lg:w-1/2 h-[600px]">
                    {/* Single Computer with enhanced 3D effect */}
                    <div className="absolute top-0 left-0 w-[600px] h-[400px] 
                         transform transition-all duration-500 hover:scale-105 hover:-rotate-1">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#2a2f3c] to-[#1a1f2c] 
                           rounded-xl shadow-2xl border border-gray-800">
                        {/* Top bar with window controls */}
                        <div className="absolute top-0 left-0 w-full h-8 bg-[#1a1f2c] rounded-t-xl 
                             flex items-center px-4 border-b border-gray-800">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center">
                              <div className="w-2 h-[1px] bg-red-800 opacity-0 group-hover:opacity-100"></div>
                            </div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500 flex items-center justify-center">
                              <div className="w-2 h-2 bg-yellow-800 opacity-0 group-hover:opacity-100"></div>
                            </div>
                            <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center">
                              <div className="w-1 h-1 bg-green-800 opacity-0 group-hover:opacity-100"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Screen with subtle reflections */}
                        <div className="absolute inset-0 mt-8 mx-4 mb-4 rounded-b-lg overflow-hidden bg-black shadow-inner">
                          <img
                            src={project.screenshots?.[0] || "/placeholder-image.png"}
                            alt={`${project.title} screenshot`}
                            className="w-full h-full object-cover"
                          />
                          {/* Screen reflection */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-30 pointer-events-none"></div>
                        </div>
                        
                        {/* Bottom edge highlight */}
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      </div>
                      
                      {/* Computer shadow */}
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[500px] h-[20px] 
                           bg-black/20 blur-xl rounded-full z-0"></div>
                    </div>
                  </div>
                )
              ) : (
                <div className="w-full lg:w-1/2">
                  <img
                    src="/portfolio-preview.png"
                    alt="Portfolio preview"
                    className="w-full rounded-lg shadow-2xl"
                  />
                </div>
              )}

              <div className="w-full lg:w-1/2 space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-[2px] w-12 bg-primary" />
                  <span className="text-primary uppercase font-mono">{project.subtitle}</span>
                </div>

                <h3 className="font-tusker uppercase text-5xl text-white">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 text-lg max-w-xl">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech: string) => (
                    <span 
                      key={tech} 
                      className="px-4 py-2 bg-[#1a1f2c] text-gray-300 text-sm rounded-lg transition-all duration-300 hover:bg-primary hover:text-black"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <Link 
                  to={`/project/${project.name}`}
                  className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors duration-300 group mt-4"
                >
                  View project
                  <svg 
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;