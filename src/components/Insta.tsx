
import { useEffect, useRef, useState } from "react";

const API = import.meta.env.VITE_API_URL;
const STAGGER_DELAYS = ["75ms", "175ms", "275ms", "375ms"];

export default function Insta() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // Fetch Instagram images from Strapi
  useEffect(() => {
  const fetchImages = async () => {
    const API = import.meta.env.VITE_API_URL;

    const res = await fetch(
      `${API}/api/instagram-images?populate=*&sort=order:asc`
    );
    const data = await res.json();

    const imgs = data.data.map((item: any, i: number) => ({
      id: item.id,
      src: `${API}${item.image?.url}`,
      alt: `Instagram photo ${i + 1}`,
    }));

    setPosts(imgs);
  };

  fetchImages();
}, []);
  return (
    <>
      <section
        ref={sectionRef}
        className="w-full bg-white px-5 sm:px-10 py-20 sm:py-24 box-border"
      >
        <div className="max-w-screen-xl mx-auto">

          {/* Header */}
          <div className={`flex flex-col items-center gap-4 mb-14 reveal${visible ? " in" : ""}`}>
            <svg
              className="w-7 h-7 text-neutral-800"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
            </svg>

            <h2 className="font-cormorant-sc font-light text-neutral-900 uppercase tracking-insta text-sm sm:text-base">
              Follow Me on Instagram
            </h2>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3.5">
            {posts.map((post, i) => (
              <div
                key={post.id}
                className={`relative overflow-hidden aspect-square reveal-tile${visible ? " in" : ""}`}
                style={{ transitionDelay: visible ? STAGGER_DELAYS[i] : "0ms" }}
              >
                <img
                  src={post.src}
                  alt={post.alt}
                  loading="lazy"
                  className="w-full h-full object-cover block"
                />
              </div>
            ))}
          </div>

          {/* Handle */}
          <div
            className={`flex justify-center mt-12 reveal${visible ? " in" : ""}`}
            style={{ transitionDelay: visible ? "500ms" : "0ms" }}
          >
            <a
              href="https://www.instagram.com/studio.__n?igsh=ODJ5Z2J3djRrbWgy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-cormorant-sc font-light text-neutral-900 uppercase tracking-insta text-xs sm:text-sm pb-0.5 insta-handle"
            >
              @studio.__n
            </a>
          </div>
        </div>

        <div
          className={`w-full h-px bg-stone-200 mt-20 reveal${visible ? " in" : ""}`}
          style={{ transitionDelay: visible ? "700ms" : "0ms" }}
        />
      </section>
    </>
  );
}
