import ExperienceCarousel from "@/components/ExperienceCarousel";

export default function ExperiencesSection() {
  // Sample experience data - in a real app, this might come from an API or context
  const experiences = [
    {
      id: 1,
      title: "Mathematics Competition",
      description: "Achievement in problem-solving and mathematical thinking",
      image: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
      id: 2,
      title: "Science Olympiad",
      description: "Participated in national science challenge",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
      id: 3,
      title: "Creative Writing Contest",
      description: "Recognized for poetic expression and storytelling",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    }
  ];

  return (
    <section id="experiences" className="mb-16 min-h-[50vh]">
      <h2 className="section-title text-2xl font-semibold mb-10 mt-5 tracking-wider">EXPERIENCES</h2>
      
      <div className="relative">
        <p className="mb-6">
          Throughout my academic journey, I've participated in various competitions and 
          programs that have expanded my knowledge and skills.
        </p>
        
        <ExperienceCarousel experiences={experiences} />
      </div>
    </section>
  );
}
