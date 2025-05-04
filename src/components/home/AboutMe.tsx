import { useEffect, useRef, useState } from 'react';

const AboutMe = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.5, // Trigger when 10% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen px-4 sm:px-8 md:px-16 py-16 sm:py-24 md:py-32">
      <div className="max-w-xl mx-auto md:ml-16 lg:ml-32">
        <h2 className={`font-tusker text-4xl sm:text-5xl md:text-6xl text-primary mb-8 sm:mb-12 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          HELLO, BONJOUR
        </h2>
        <div className="space-y-6 sm:space-y-8 font-tusker text-left max-w-[600px]">
          <p className={`text-base sm:text-lg md:text-xl leading-relaxed uppercase transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            Born in Quebec, currently a 4th year computer science student at the University of Victoria, studying with honors in Software Systems. I'm a fullstack developer with a passion for creating elegant solutions to complex problems.
          </p>
          <p className={`text-base sm:text-lg md:text-xl leading-relaxed uppercase transition-all duration-500 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            I believe the best way to learn is by putting myself in challenging situations. Currently, I am looking for a Full-Stack Developer Co-op position to gain experience in the industry. However, if you have any opportunities, feel free to reach out to me!
          </p>
          <p className={`text-base sm:text-lg md:text-xl leading-relaxed uppercase transition-all duration-500 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            When I'm not coding, you can find playing basketball, or working on personal projects. At the moment, I am working on a Reciper finder application called Krumbz with my friends.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe; 