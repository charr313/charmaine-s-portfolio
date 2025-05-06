import { useState, useCallback, useEffect } from 'react';

export function useSectionObserver() {
  const [sections, setSections] = useState<Element[]>([]);
  const [activeSection, setActiveSection] = useState<string>('about');

  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (id) {
          setActiveSection(id);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (sections.length === 0) return;

    const observerOptions = {
      rootMargin: '-50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, [sections, observerCallback]);

  return { activeSection, setSections };
}
