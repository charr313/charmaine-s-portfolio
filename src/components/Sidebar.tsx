import { useMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

export default function Sidebar({ activeSection, onSectionClick }: SidebarProps) {
  const isMobile = useMobile();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    onSectionClick(sectionId);
  };

  return (
    <nav className={`
      ${isMobile ? 'w-full relative' : 'fixed w-[350px] h-screen'} 
      p-10 
      bg-gradient-to-r from-[rgba(255,231,255,0.8)] to-[rgba(255,255,255,0.9)]
      backdrop-blur-lg 
      border-r border-[rgba(155,107,155,0.1)] 
      z-10
    `}>
      <h1 className="text-3xl font-bold mb-2">Charmaine</h1>
      
      <ul className={`
        ${isMobile ? 'flex space-x-4 overflow-x-auto' : 'block space-x-0'} 
        mb-10
      `}>
        <li className="mb-4">
          <a 
            href="#about" 
            className={`text-sm tracking-wide transition-colors hover:text-accent ${activeSection === 'about' ? 'text-accent' : ''}`}
            onClick={(e) => handleNavClick(e, 'about')}
          >
            About
          </a>
        </li>
        <li className="mb-4">
          <a 
            href="#leadership" 
            className={`text-sm tracking-wide transition-colors hover:text-accent ${activeSection === 'leadership' ? 'text-accent' : ''}`}
            onClick={(e) => handleNavClick(e, 'leadership')}
          >
            Leadership
          </a>
        </li>
        <li className="mb-4">
          <a 
            href="#projects" 
            className={`text-sm tracking-wide transition-colors hover:text-accent ${activeSection === 'projects' ? 'text-accent' : ''}`}
            onClick={(e) => handleNavClick(e, 'projects')}
          >
            Projects
          </a>
        </li>
        <li className="mb-4">
          <a 
            href="#experiences" 
            className={`text-sm tracking-wide transition-colors hover:text-accent ${activeSection === 'experiences' ? 'text-accent' : ''}`}
            onClick={(e) => handleNavClick(e, 'experiences')}
          >
            Experiences
          </a>
        </li>
      </ul>
    </nav>
  );
}
