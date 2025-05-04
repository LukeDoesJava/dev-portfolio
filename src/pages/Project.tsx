import { useParams, useNavigate } from 'react-router-dom';
import { projects, Project as ProjectType } from '../data/projects';
import { useEffect, useState } from 'react';

const Project = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find the project by name
    const foundProject = projects.find(p => p.name === id);

    if (foundProject) {
      setProject(foundProject);
    }
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center text-white px-4">
        <h1 className="font-tusker text-4xl sm:text-6xl mb-6">Project Not Found</h1>
        <button
          onClick={() => navigate('/')}
          className="font-tusker px-6 py-3 border-2 rounded-full hover:bg-primary hover:text-black transition-all duration-300"
        >
          BACK TO HOME
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-[#121212]/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="font-tusker text-primary hover:opacity-80 transition-opacity"
          >
            ← BACK
          </button>
        </div>
      </div>

      {/* Project Content */}
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-[2px] w-12 bg-primary" />
            <span className="text-primary uppercase font-mono">{project.subtitle}</span>
          </div>
          <div className="flex items-center justify-between gap-6 mb-6">
            <h1 className="font-tusker text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
              {project.title}
            </h1>
            {project.uniqueURL && (
              <a 
                href={project.uniqueURL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 font-tusker px-6 py-3 border-2 rounded-full hover:bg-primary hover:text-black transition-all duration-300 whitespace-nowrap"
              >
                VISIT PROJECT
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
          <p className="text-gray-400 text-lg sm:text-xl max-w-3xl">
            {project.description}
          </p>
          {/* Mobile Visit Project Button */}
          {project.uniqueURL && (
            <a 
              href={project.uniqueURL}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden inline-flex items-center gap-2 font-tusker px-6 py-3 border-2 rounded-full hover:bg-primary hover:text-black transition-all duration-300 mt-6"
            >
              VISIT PROJECT
              <svg 
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>

        {/* Overview Section */}
        <div className="mb-12">
          <h2 className="font-tusker text-2xl sm:text-3xl mb-4">PROJECT OVERVIEW</h2>
          <div className="bg-[#1a1f2c] rounded-lg p-6 sm:p-8">
            <p className="text-gray-300 text-lg leading-relaxed">
              {project.overview}
            </p>
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-12">
          <h2 className="font-tusker text-2xl sm:text-3xl mb-4">TECHNOLOGIES</h2>
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
        </div>

        {/* Screenshots/Content */}
        <div className="mb-12">
          <h2 className="font-tusker text-2xl sm:text-3xl mb-6">PROJECT SHOWCASE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.title === "Krumbz" ? (
              <>
                {/* YouTube Video */}
                {project.youtubeUrl && (
                  <div className="aspect-video w-full rounded-lg overflow-hidden">
                    <iframe
                      src={project.youtubeUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
                {/* Screenshots */}
                {project.screenshots?.map((screenshot, index) => (
                  <div 
                    key={index}
                    className="aspect-video w-full rounded-lg overflow-hidden bg-[#1a1f2c] p-1"
                  >
                    <img
                      src={screenshot}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </>
            ) : (
              // Regular screenshots for other projects
              project.screenshots?.map((screenshot, index) => (
                <div 
                  key={index}
                  className="aspect-video w-full rounded-lg overflow-hidden bg-[#1a1f2c] p-1"
                >
                  <img
                    src={screenshot}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Project Links - Now only showing GitHub */}
        {project.githubURL && (
          <div className="mb-12">
            <a 
              href={project.githubURL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-tusker px-6 py-3 border-2 rounded-full hover:bg-primary hover:text-black transition-all duration-300"
            >
              VIEW CODE
              <svg 
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Project; 