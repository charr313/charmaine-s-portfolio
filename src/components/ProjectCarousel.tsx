import { useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

interface Slide {
  id: number;
  title: string;
  image: string;
  alt: string;
}

interface ProjectCarouselProps {
  slides: Slide[];
}

export default function ProjectCarousel({ slides }: ProjectCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      setCurrentSlide(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      setCurrentSlide(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
      setCurrentSlide(index);
    }
  }, [emblaApi]);

  // Make sure to update the current slide index when the carousel slides
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentSlide(emblaApi.selectedScrollSnap());
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
    <div className="relative w-full md:w-[500px] mx-auto">
      <div className="overflow-hidden rounded-lg shadow-lg" ref={emblaRef}>
        <div className="flex h-[375px]">
          {slides.map((slide) => (
            <div className="min-w-full h-full flex-shrink-0" key={slide.id}>
              <img 
                src={slide.image}
                alt={slide.alt} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      
      <button 
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition-all"
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        &#10094;
      </button>
      
      <button 
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition-all"
        onClick={scrollNext}
        aria-label="Next slide"
      >
        &#10095;
      </button>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button 
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
          </button>
        ))}
      </div>
    </div>
  );
}
