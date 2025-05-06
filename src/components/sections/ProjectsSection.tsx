import ProjectCarousel from "@/components/ProjectCarousel";

export default function ProjectsSection() {
  // Sample project data - in a real app, this might come from an API or context
  const projectSlides = [
    {
      id: 1,
      title: "Mathematics Competition",
      image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      alt: "Mathematics competition certificate"
    },
    {
      id: 2,
      title: "Science Project",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      alt: "Science project display"
    },
    {
      id: 3,
      title: "Coding Challenge",
      image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      alt: "Coding challenge award"
    }
  ];

  return (
    <section id="projects" className="mb-16 min-h-[50vh]">
      <h2 className="section-title text-2xl font-semibold mb-10 mt-5 tracking-wider">PROJECTS</h2>
      
      <div className="mb-8">
        <p className="mb-6">
          I've participated in various academic and creative projects throughout my educational journey, 
          expanding my skills in problem-solving, creativity, and collaboration.
        </p>
        
        <ProjectCarousel slides={projectSlides} />
      </div>
    </section>
  );
}
