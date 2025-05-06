import { useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import AboutSection from "@/components/sections/AboutSection";
import LeadershipSection from "@/components/sections/LeadershipSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperiencesSection from "@/components/sections/ExperiencesSection";
import { useSectionObserver } from "@/hooks/use-section-observer";

export default function Home() {
  const sectionsRef = useRef<HTMLDivElement>(null);
  const { activeSection, setSections } = useSectionObserver();

  useEffect(() => {
    if (sectionsRef.current) {
      const sectionElements = sectionsRef.current.querySelectorAll("section[id]");
      setSections(Array.from(sectionElements));
    }
  }, [setSections]);

  // Handle smooth scrolling for navigation
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 40,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar activeSection={activeSection} onSectionClick={scrollToSection} />
      
      <main ref={sectionsRef} className="md:ml-[350px] p-6 md:p-10 max-w-[1000px] mx-auto">
        <AboutSection />
        <LeadershipSection />
        <ProjectsSection />
        <ExperiencesSection />
      </main>
    </div>
  );
}
