
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = () => {
  const [slides, setSlides] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
  const fetchSlides = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/hero-slides?populate=*&sort=order:asc`
    );

    const data = await res.json();

    const formatted = data.data.map((item: any) => ({
      image: `${import.meta.env.VITE_API_URL}${item.image?.url}`,
      title: item.title,
      subtitle: item.subtitle
    }));

    setSlides(formatted);
  };

  fetchSlides();
}, []);

  const next = useCallback(() => {
    if (!slides.length) return;
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides]);

  useEffect(() => {
    if (!slides.length) return;

    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, slides]);

  if (!slides.length) return null;

  return (
    <section id="home" className="pt-28 md:pt-32 px-4 md:px-8 lg:px-12">
      <div className="relative w-full h-[60vh] md:h-[75vh] lg:h-[85vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={slides[current].image}
            alt={slides[current].alt}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Overlay */}
        <div className="absolute inset-0 bg-foreground/10 z-10" />

        {/* Static Text */}
        <div className="relative z-20 flex flex-col items-center justify-end h-full pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center"
          >
            <h1 className="font-serif text-background text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.15em] uppercase drop-shadow-lg">
  {slides[current]?.title}
</h1>

<p className="text-background/80 uppercase text-xs md:text-sm tracking-[0.3em] mt-4 drop-shadow-md">
  {slides[current]?.subtitle}
</p>
          </motion.div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-background w-6" : "bg-background/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Tagline */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 py-16 md:py-20 px-4">
        <h2 className="font-serif text-foreground text-3xl md:text-4xl lg:text-5xl font-light leading-tight max-w-md">
          I'm Nikhil, a UK
          <br />
          Editorial
          <br />
          Photographer
        </h2>

        <div className="hidden md:block w-[1px] h-24 bg-muted-foreground/40" />

        <p className="uppercase text-xs md:text-sm tracking-[0.3em] text-muted-foreground text-center font-serif italic">
          Covering the UK &amp;
          <br />
          Worldwide
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
