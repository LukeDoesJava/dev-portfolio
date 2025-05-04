export interface Project {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  overview: string;
  technologies: string[];
  link: string;
  screenshots?: string[];
  youtubeUrl?: string | null;
  uniqueURL?: string | null;
  githubURL?: string | null;
}

export const projects: Project[] = [
  {
    name: "krumbz",
    title: "Krumbz",
    subtitle: "Recipe Finder App",
    description: "A mobile application that helps users discover recipes based on the ingredients they have. Leverages AI to provide users convenient ways to add ingredients and find recipes.",
    overview: "A mobile application for iOS and Android that allows users to input the ingredients they have in their fridge and generates recipes based on those ingredients. Users may take a picture of their groceries or receipt and the app will automatically input the ingredients. The app uses Google Gemini API to process visual data and translate it into text, featuring a custom-made recipe-finding algorithm that compiles millions of recipes on the internet and allows for unit conversion based on user preferences. From this data, our app generates a list of recipes that the user can make with the ingredients they have, and cookware they own. The app was built using React Native and Expo, developed with TypeScript and Python.",
    technologies: ["TypeScript", "React Native", "Python", "Postman"],
    link: "#",
    screenshots: ["/src/assets/images/projects/krumbz/screenshot1.png"],
    youtubeUrl: "https://www.youtube.com/embed/M3Tz-8fkkIQ"

  },
  {
    name: "algo-visual",
    title: "Algo//Visual",
    subtitle: "Algorithm Visualization",
    description: "An interactive web application that visualizes various sorting and pathfinding algorithms in real-time.",
    overview: "An interactive web application that visualizes various sorting and pathfinding algorithms in real-time.",
    technologies: ["TypeScript", "React", "Tailwind"],
    link: "#",
    screenshots: ["/src/assets/images/projects/algovisual/screenshot1.png", "/src/assets/images/projects/algovisual/screenshot2.png"],
    uniqueURL: "https://algo-visualizer-wheat.vercel.app/"
  },
  {
    name: "damage-inc",
    title: "Damage Inc",
    subtitle: "API Integration Platform",
    description: "A gaming platform where users can find like-minded players to play with. Users can post gaming events to our forum to find players to join them.",
    overview: "A gaming platform where users can find like-minded players to play with. Users can post gaming events to our forum to find players to join them.",
    technologies: ["TypeScript", "API", "React Query"],
    link: "#",
    screenshots: ["/src/assets/images/projects/damageinc/screenshot1.png", "/src/assets/images/projects/damageinc/screenshot2.png"],
    uniqueURL: "https://dmginc.gg/"
  },
  {
    name: "claw-machine",
    title: "Custom Claw Machine",
    subtitle: "Highschool robotics",
    description: "A claw machine using Arudino, VexRobotics, and 3D printed components, all housed in a custom-built wooden cabinet.",
    overview: "An arcade style claw machine where users can try to win prizes using joystick controls, featuring a custom made wooden cabinet, VexRobotics motor controllers, and claw mechanism. The claw traverses the x and y axis via two motors and can be lowered and raised using a third motor that adjust the slack of the string for each component. The video below demonstrates the claw machine in action, unfortunately the video showing it function via joystick controls was lost.",
    technologies: ["RobotC", "VexRobotics", "Custom PCB", "3D Printing"],
    link: "#",
    screenshots: ["/src/assets/images/projects/arcade/screenshot1.png", "/src/assets/images/projects/arcade/arcade-2.png"]
  }
]; 