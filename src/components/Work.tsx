// import { useState, useEffect, useRef } from "react";

// const photos = [
//   { id: 1, src: "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=900&q=80", alt: "Couple laughing at ceremony" },
//   { id: 2, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&q=80", alt: "Wedding party outdoors" },
//   { id: 3, src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&q=80", alt: "Floral detail" },
//   { id: 4, src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=80", alt: "Golden hour portrait" },
//   { id: 5, src: "https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=1200&q=80", alt: "Bride and groom — featured", center: true },
//   { id: 6, src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=900&q=80", alt: "Bride detail" },
//   { id: 7, src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&q=80", alt: "Reception dancing" },
//   { id: 8, src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=80", alt: "Ceremony arch" },
//   { id: 9, src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80", alt: "Groom portrait" },
// ];

// function useInView(threshold = 0.15) {
//   const ref = useRef<HTMLDivElement>(null);
//   const [inView, setInView] = useState(false);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) setInView(true); },
//       { threshold }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, []);
//   return { ref, inView };
// }

// export default function Work() {
//   const [heroLoaded, setHeroLoaded] = useState(false);
//   const heroSection = useInView(0.1);
//   const introSection = useInView(0.2);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cormorant:ital,wght@0,300;1,300&family=Jost:wght@200;300;400&display=swap');

//         :root {
//           --cream: #f9f7f4;
//           --charcoal: #1a1a18;
//           --mid: #6b6b67;
//           --light: #c8c4bc;
//           --white: #ffffff;
//           --serif: 'Cormorant Garamond', Georgia, serif;
//           --serif-alt: 'Cormorant', Georgia, serif;
//           --sans: 'Jost', sans-serif;
//           --transition: cubic-bezier(0.65, 0, 0.35, 1);
//         }

//         body { background: var(--cream); color: var(--charcoal); }

//         /* Hero image fade-in */
//         .w-hero-img { opacity: 0; transition: opacity 1.4s var(--transition); }
//         .w-hero-img.loaded { opacity: 0.82; }

//         /* Hero content entrance */
//         .w-hero-content {
//           opacity: 0;
//           transform: translateY(18px);
//           transition: opacity 1.1s 0.6s var(--transition), transform 1.1s 0.6s var(--transition);
//         }
//         .w-hero-content.visible { opacity: 1; transform: translateY(0); }

//         /* Scroll indicator */
//         .w-hero-scroll {
//           opacity: 0;
//           animation: fadeUp 0.8s 2s forwards;
//         }
//         .w-scroll-line {
//           width: 1px;
//           height: 48px;
//           background: rgba(255,255,255,0.3);
//           position: relative;
//           overflow: hidden;
//         }
//         .w-scroll-line::after {
//           content: '';
//           position: absolute;
//           top: -100%;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: rgba(255,255,255,0.8);
//           animation: scrollDrop 1.6s 2.2s ease-in-out infinite;
//         }

//         /* Intro section */
//         .w-intro-anim {
//           opacity: 0;
//           transform: translateY(30px);
//           transition: opacity 1s var(--transition), transform 1s var(--transition);
//         }
//         .w-intro-anim.visible { opacity: 1; transform: translateY(0); }

//         /* Section label */
//         .w-section-label-anim {
//           opacity: 0;
//           transition: opacity 0.8s var(--transition);
//         }
//         .w-section-label-anim.visible { opacity: 1; }

//         /* Grid item */
//         .w-grid-item {
//           position: relative;
//           overflow: hidden;
//           opacity: 0;
//           transform: translateY(24px);
//           transition: opacity 0.85s var(--transition), transform 0.85s var(--transition), box-shadow 0.4s ease;
//         }
//         .w-grid-item.visible { opacity: 1; transform: translateY(0); }

//         /* Stagger delays */
//         .w-grid-item:nth-child(1) { transition-delay: 0s; }
//         .w-grid-item:nth-child(2) { transition-delay: 0.07s; }
//         .w-grid-item:nth-child(3) { transition-delay: 0.14s; }
//         .w-grid-item:nth-child(4) { transition-delay: 0.05s; }
//         .w-grid-item:nth-child(5) { transition-delay: 0.12s; }
//         .w-grid-item:nth-child(6) { transition-delay: 0.19s; }
//         .w-grid-item:nth-child(7) { transition-delay: 0.10s; }
//         .w-grid-item:nth-child(8) { transition-delay: 0.17s; }
//         .w-grid-item:nth-child(9) { transition-delay: 0.24s; }

//         /* Grid image hover */
//         .w-grid-img {
//           width: 100%;
//           height: 100%;
//           display: block;
//           object-fit: cover;
//           filter: grayscale(18%);
//           transform: scale(1.05);
//           transition: transform 0.85s var(--transition), filter 0.5s ease;
//         }
//         .w-grid-item:hover .w-grid-img {
//           transform: scale(1);
//           filter: grayscale(0%);
//         }

//         /* Hover overlay */
//         .w-grid-hover {
//           position: absolute;
//           inset: 0;
//           background: rgba(15,15,12,0);
//           transition: background 0.4s ease;
//           display: flex;
//           align-items: flex-end;
//           padding: 20px;
//         }
//         .w-grid-item:hover .w-grid-hover { background: rgba(15,15,12,0.28); }

//         .w-grid-hover-text {
//           font-family: var(--sans);
//           font-size: 9px;
//           letter-spacing: 0.4em;
//           text-transform: uppercase;
//           color: rgba(255,255,255,0);
//           transition: color 0.3s ease 0.1s;
//         }
//         .w-grid-item:hover .w-grid-hover-text { color: rgba(255,255,255,0.7); }

//         /* Marquee */
//         .w-marquee-track {
//           display: flex;
//           gap: 64px;
//           width: max-content;
//           animation: marquee 22s linear infinite;
//         }

//         /* CTA button fill */
//         .w-cta-btn {
//           position: relative;
//           overflow: hidden;
//           transition: color 0.4s ease;
//         }
//         .w-cta-btn::before {
//           content: '';
//           position: absolute;
//           inset: 0;
//           background: var(--charcoal);
//           transform: translateX(-101%);
//           transition: transform 0.45s var(--transition);
//         }
//         .w-cta-btn:hover { color: var(--white); }
//         .w-cta-btn:hover::before { transform: translateX(0); }
//         .w-cta-btn span { position: relative; z-index: 1; }

//         /* Keyframes */
//         @keyframes fadeUp { to { opacity: 1; } }
//         @keyframes scrollDrop {
//           0% { top: -100%; }
//           100% { top: 100%; }
//         }
//         @keyframes marquee {
//           from { transform: translateX(0); }
//           to { transform: translateX(-50%); }
//         }
//       `}</style>

//       {/* HERO */}
//       <section
//         ref={heroSection.ref}
//         className="relative w-full overflow-hidden bg-[#1a1a18]"
//         style={{ height: "100svh", minHeight: "600px" }}
//       >
//         <img
//           className={`w-hero-img absolute inset-0 w-full h-full object-cover object-[center_30%] [filter:grayscale(100%)_contrast(1.05)]${heroLoaded ? " loaded" : ""}`}
//           src="https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=1600&q=85"
//           alt="Wedding photography hero"
//           onLoad={() => setHeroLoaded(true)}
//         />

//         {/* Overlay */}
//         <div
//           className="absolute inset-0"
//           style={{
//             background: "linear-gradient(to bottom, rgba(10,10,8,0.15) 0%, rgba(10,10,8,0.05) 30%, rgba(10,10,8,0.45) 100%)"
//           }}
//         />

//         {/* Content */}
//         <div className={`w-hero-content absolute inset-0 flex flex-col items-center justify-center text-center px-6${heroSection.inView ? " visible" : ""}`}>
//           <p
//             className="mb-5 text-[10px] font-light tracking-[0.42em] uppercase text-white/60"
//             style={{ fontFamily: "var(--sans)" }}
//           >
//             N Studio
//           </p>
//           <h1
//             className="font-light tracking-[0.18em] uppercase text-white leading-[1.1] mb-[18px]"
//             style={{
//               fontFamily: "var(--serif)",
//               fontSize: "clamp(32px, 5.5vw, 72px)",
//             }}
//           >
//             Wedding Photography<br />With Feeling
//           </h1>
//           <p
//             className="font-extralight tracking-[0.5em] uppercase text-white/55"
//             style={{
//               fontFamily: "var(--sans)",
//               fontSize: "clamp(9px, 1.1vw, 12px)",
//             }}
//           >
//             Captured on Digital &nbsp;&amp;&nbsp; 35mm Film
//           </p>
//         </div>

//         {/* Scroll indicator */}
//         <div className="w-hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-[10px]">
//           <span
//             className="text-[9px] tracking-[0.4em] uppercase text-white/45"
//             style={{ fontFamily: "var(--sans)" }}
//           >
//             Scroll
//           </span>
//           <div className="w-scroll-line" />
//         </div>
//       </section>

//       {/* INTRO */}
//       <div
//         ref={introSection.ref}
//         className={`w-intro-anim max-w-[780px] mx-auto px-10 pt-[120px] pb-20 text-center${introSection.inView ? " visible" : ""}`}
//       >
//         <div className="w-10 h-px bg-[#c8c4bc] mx-auto mb-12" />
//         <p
//           className="font-light leading-[1.85] text-[#1a1a18] tracking-[0.01em]"
//           style={{
//             fontFamily: "var(--serif-alt)",
//             fontSize: "clamp(17px, 1.1vw, 22px)",
//           }}
//         >
//           No two weddings are the same and that's exactly why I love them. I'm here to document everything
//           from the quietest glances to the boldest, most iconic moments. My approach blends storytelling
//           with a romantic, editorial eye — capturing your day as it naturally unfolds, in a way that feels
//           effortless and full of feeling. From the first time we connect, I take the time to really get to
//           know you and your vision, your energy and the kind of experience you want to create.
//         </p>
//       </div>

//       {/* MARQUEE */}
//       <div className="overflow-hidden border-t border-b border-[#c8c4bc] py-[18px] mb-0">
//         <div className="w-marquee-track">
//           {[...Array(2)].map((_, i) =>
//             ["Documentary", "Editorial", "35mm Film", "Golden Hour", "Timeless", "Romantic", "Candid", "Intimate"].map((w) => (
//               <div
//                 key={`${i}-${w}`}
//                 className="flex items-center gap-8 whitespace-nowrap font-light italic tracking-[0.06em] text-[#6b6b67]"
//                 style={{
//                   fontFamily: "var(--serif)",
//                   fontSize: "clamp(13px, 1.4vw, 16px)",
//                 }}
//               >
//                 {w}
//                 <span className="w-[3px] h-[3px] rounded-full bg-[#c8c4bc] flex-shrink-0" />
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* GRID */}
//       <GridSection />

//       {/* CTA */}
//       <div className="text-center px-10 py-[120px]">
//         <p
//           className="font-light italic tracking-[0.04em] text-[#1a1a18] mb-10 leading-[1.3]"
//           style={{
//             fontFamily: "var(--serif)",
//             fontSize: "clamp(28px, 4vw, 52px)",
//           }}
//         >
//           Let's create something<br />truly unforgettable
//         </p>
//         <a
//           href="/contact"
//           className="w-cta-btn inline-block font-light tracking-[0.42em] uppercase text-[#1a1a18] border border-[#1a1a18] py-4 px-10 text-[10px] no-underline"
//           style={{ fontFamily: "var(--sans)" }}
//         >
//           <span>Begin Your Story</span>
//         </a>
//       </div>

//       {/* FOOTER */}
//       {/* <footer className="border-t border-[#c8c4bc] px-12 py-10 flex items-center justify-between flex-wrap gap-4">
//         <span
//           className="text-[11px] font-light tracking-[0.4em] uppercase text-[#1a1a18]"
//           style={{ fontFamily: "var(--serif)" }}
//         >
//           N Studio
//         </span>
//         <span
//           className="text-[10px] font-extralight tracking-[0.25em] text-[#6b6b67]"
//           style={{ fontFamily: "var(--sans)" }}
//         >
//           © {new Date().getFullYear()} N Studio Photography
//         </span>
//       </footer> */}
//     </>
//   );
// }

// function GridSection() {
//   const wrapper = useRef<HTMLDivElement>(null);
//   const [visible, setVisible] = useState(false);
//   const [itemsVisible, setItemsVisible] = useState<boolean[]>(new Array(photos.length).fill(false));

//   useEffect(() => {
//     const el = wrapper.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, []);

//   useEffect(() => {
//     if (!visible) return;
//     photos.forEach((_, i) => {
//       setTimeout(() => {
//         setItemsVisible((prev) => { const next = [...prev]; next[i] = true; return next; });
//       }, i * 90);
//     });
//   }, [visible]);

//   return (
//     <div ref={wrapper}>
//       {/* Section label */}
//       <div
//         className={`w-section-label-anim flex items-center gap-5 px-[clamp(24px,5vw,80px)] pb-[60px] max-w-[1400px] mx-auto${visible ? " visible" : ""}`}
//       >
//         {/* <div className="flex-1 h-px bg-[#c8c4bc]" /> */}
//         {/* <span
//           className="text-[9px] font-light tracking-[0.5em] uppercase text-[#6b6b67] whitespace-nowrap"
//           style={{ fontFamily: "var(--sans)" }}
//         >
//           Selected Work
//         </span> */}
//         <div className="flex-1 h-px bg-[#c8c4bc]" />
//       </div>

//       {/* Grid wrapper */}
//       <div
//         className="max-w-[1400px] mx-auto"
//         style={{ padding: "0 clamp(16px, 4vw, 64px) 120px" }}
//       >
//         <style>{`
//           .photo-grid {
//             display: grid;
//             grid-template-columns: repeat(3, 1fr);
//             grid-template-rows: repeat(3, 360px);
//             gap: 14px;
//           }
//           @media (max-width: 860px) {
//             .photo-grid {
//               grid-template-columns: repeat(2, 1fr);
//               grid-template-rows: repeat(5, 300px);
//             }
//           }
//           @media (max-width: 520px) {
//             .photo-grid {
//               grid-template-columns: 1fr;
//               grid-template-rows: repeat(9, 300px);
//             }
//           }
//         `}</style>

//         <div className="photo-grid">
//           {photos.map((p, i) => {
//             return (
//               <div
//                 key={p.id}
//                 className={`w-grid-item${itemsVisible[i] ? " visible" : ""}`}
//               >
//                 <img
//                   className="w-grid-img"
//                   src={p.src}
//                   alt={p.alt}
//                   loading="lazy"
//                 />
//                 <div className="w-grid-hover">
//                   <span className="w-grid-hover-text">View</span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect, useRef } from "react";

const API = "http://localhost:1337";

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
        setHeroImage(API + data.data[0].image.url);
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
          src: API + item.image.url,
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