import { useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

interface Experience {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface ExperienceCarouselProps {
  experiences: Experience[];
}

export default function ExperienceCarousel({ experiences }: ExperienceCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      setActiveIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      setActiveIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
      setActiveIndex(index);
    }
  }, [emblaApi]);

  // Make sure to update the active index when the carousel slides
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Register the onSelect callback when emblaApi changes
  useState(() => {
    if (emblaApi) {
      emblaApi.on("select", onSelect);
      return () => {
        emblaApi.off("select", onSelect);
      };
    }
  });

  return (
    <div className="relative mx-auto w-full md:w-[600px]">
      <div className="overflow-hidden rounded-xl shadow-lg" ref={emblaRef}>
        <div className="flex transition-transform duration-500 ease-out h-[350px]">
          {experiences.map((exp) => (
            <div className="min-w-full flex-shrink-0" key={exp.id}>
              <div className="relative h-full">
                <img 
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-semibold mb-2">{exp.title}</h3>
                  <p className="text-white/90 text-sm">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button 
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/60 rounded-full flex items-center justify-center transition-all"
        onClick={scrollPrev}
        aria-label="Previous experience"
      >
        &#10094;
      </button>
      
      <button 
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/60 rounded-full flex items-center justify-center transition-all"
        onClick={scrollNext}
        aria-label="Next experience"
      >
        &#10095;
      </button>
      
      <div className="flex justify-center gap-2 mt-4">
        {experiences.map((_, idx) => (
          <button 
            key={idx}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === activeIndex ? 'bg-accent' : 'bg-accent/30 hover:bg-accent/60'
            }`}
            onClick={() => scrollTo(idx)}
            aria-label={`Go to experience ${idx + 1}`}
          >
          </button>
        ))}
      </div>
    </div>
  );
}
