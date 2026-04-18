
import { useState, useEffect, useRef } from "react";

const API = import.meta.env.VITE_API_URL;

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, inView };
}

export default function Work() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [photos, setPhotos] = useState<any[]>([]);
  const [heroImage, setHeroImage] = useState("");

  const heroSection = useInView(0.1);
  const introSection = useInView(0.2);

  // Fetch images from Strapi
  useEffect(() => {
  const fetchHero = async () => {
    try {
      const res = await fetch(
        `${API}/api/work-images?filters[isHero][$eq]=true&populate=*`
      );

      const data = await res.json();

      if (data.data.length > 0) {
        setHeroImage(`${API}${data.data[0].image?.url}`);
      }
    } catch (err) {
      console.error("Error loading hero image", err);
    }
  };

  fetchHero();
}, []);
  useEffect(() => {
    const fetchWork = async () => {
      try {
        const res = await fetch(
          `${API}/api/work-images?populate=*&sort=order:asc`
        );

        const data = await res.json();

        const imgs = data.data.map((item: any, i: number) => ({
          id: item.id,
          src: `${API}${item.image?.url}`,
          alt: `Work photo ${i + 1}`,
        }));

        setPhotos(imgs);
      } catch (err) {
        console.error("Error loading work images", err);
      }
    };

    fetchWork();
  }, []);

  return (
    <>
      {/* HERO */}
      <section
        ref={heroSection.ref}
        className="relative w-full overflow-hidden bg-[#1a1a18]"
        style={{ height: "100svh", minHeight: "600px" }}
      >
        <img
          className={`absolute inset-0 w-full h-full object-cover ${
            heroLoaded ? "opacity-80" : "opacity-0"
          }`}
          src={heroImage}
          alt="Wedding photography hero"
          onLoad={() => setHeroLoaded(true)}
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <p className="text-xs tracking-[0.4em] uppercase mb-4">
            N Studio
          </p>

          <h1 className="text-5xl md:text-7xl font-light tracking-[0.2em] uppercase mb-6">
            Wedding Photography <br /> With Feeling
          </h1>

          <p className="text-xs tracking-[0.4em] uppercase opacity-70">
            Captured on Digital & 35mm Film
          </p>
        </div>
      </section>

      {/* INTRO */}
      <div
        ref={introSection.ref}
        className={`max-w-[780px] mx-auto px-10 pt-[120px] pb-20 text-center ${
          introSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        } transition-all duration-700`}
      >
        <div className="w-10 h-px bg-[#c8c4bc] mx-auto mb-12" />

        <p className="text-lg leading-[1.8]">
          No two weddings are the same and that's exactly why I love them.
          I'm here to document everything from the quietest glances to the
          boldest moments with a romantic editorial eye.
        </p>
      </div>

      {/* GRID */}
      <GridSection photos={photos} />

      {/* CTA */}
      <div className="text-center px-10 py-[120px]">
        <p className="text-4xl font-light italic mb-10">
          Let's create something <br /> truly unforgettable
        </p>

        <a
          href="/contact"
          className="border border-black px-10 py-4 uppercase tracking-[0.4em] text-xs hover:bg-black hover:text-white transition"
        >
          Begin Your Story
        </a>
      </div>
    </>
  );
}

function GridSection({ photos }: { photos: any[] }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [itemsVisible, setItemsVisible] = useState<boolean[]>([]);

  useEffect(() => {
    if (!wrapper.current) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    obs.observe(wrapper.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !photos.length) return;

    setItemsVisible(new Array(photos.length).fill(false));

    photos.forEach((_, i) => {
      setTimeout(() => {
        setItemsVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 100);
    });
  }, [visible, photos]);

  return (
    <div ref={wrapper} className="max-w-[1400px] mx-auto px-6 pb-28">
      <div className="grid grid-cols-3 gap-4 md:grid-cols-3 sm:grid-cols-2">

        {photos.map((p, i) => (
          <div
            key={p.id}
            className={`overflow-hidden ${
              itemsVisible[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            } transition-all duration-700`}
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition duration-700"
            />
          </div>
        ))}

      </div>
    </div>
  );
}
