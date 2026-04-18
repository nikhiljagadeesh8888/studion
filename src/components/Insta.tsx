// import { useEffect, useRef, useState } from "react";

// const instagramPosts = [
//   {
//     id: 1,
//     src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
//     alt: "Groomsmen sharing a moment by the window",
//   },
//   {
//     id: 2,
//     src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80",
//     alt: "Bride and groom outside a grand manor",
//   },
//   {
//     id: 3,
//     src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80",
//     alt: "Couple laughing at the cocktail hour",
//   },
//   {
//     id: 4,
//     src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80",
//     alt: "Vintage portrait painting detail at venue",
//   },
// ];

// const STAGGER_DELAYS = ["75ms", "175ms", "275ms", "375ms"];

// export default function Insta() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.15 }
//     );
//     if (sectionRef.current) observer.observe(sectionRef.current);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Cormorant+SC:wght@300;400&display=swap');

//         .font-cormorant-sc { font-family: 'Cormorant SC', Georgia, serif; }

//         /* Scroll-reveal states */
//         .reveal      { opacity: 0; transform: translateY(20px); transition: opacity 0.8s ease, transform 0.8s ease; }
//         .reveal.in   { opacity: 1; transform: translateY(0); }

//         .reveal-tile { opacity: 0; transform: translateY(30px); transition: opacity 0.75s ease, transform 0.75s ease; }
//         .reveal-tile.in { opacity: 1; transform: translateY(0); }

//         /* 0.38em letter-spacing not available in Tailwind base */
//         .tracking-insta { letter-spacing: 0.38em; }

//         /* Handle underline hover */
//         .insta-handle { border-bottom: 1px solid transparent; transition: border-color 0.3s ease; }
//         .insta-handle:hover { border-color: #1a1a1a; }
//       `}</style>

//       <section
//         ref={sectionRef}
//         className="w-full bg-white px-5 sm:px-10 py-20 sm:py-24 box-border"
//       >
//         <div className="max-w-screen-xl mx-auto">

//           {/* ── Header ── */}
//           <div className={`flex flex-col items-center gap-4 mb-14 reveal${visible ? " in" : ""}`}>
//             <svg
//               className="w-7 h-7 text-neutral-800"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.4"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
//               <circle cx="12" cy="12" r="4" />
//               <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
//             </svg>

//             <h2 className="font-cormorant-sc font-light text-neutral-900 uppercase tracking-insta text-sm sm:text-base m-0">
//               Follow Me on Instagram
//             </h2>
//           </div>

//           {/* ── Photo Grid ── */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3.5">
//             {instagramPosts.map((post, i) => (
//               <div
//                 key={post.id}
//                 className={`relative overflow-hidden aspect-square reveal-tile${visible ? " in" : ""}`}
//                 style={{ transitionDelay: visible ? STAGGER_DELAYS[i] : "0ms" }}
//               >
//                 <img
//                   src={post.src}
//                   alt={post.alt}
//                   loading="lazy"
//                   className="w-full h-full object-cover block"
//                 />
//               </div>
//             ))}
//           </div>

//           {/* ── Handle ── */}
//           <div
//             className={`flex justify-center mt-12 reveal${visible ? " in" : ""}`}
//             style={{ transitionDelay: visible ? "500ms" : "0ms" }}
//           >
//             <a
//               href="https://www.instagram.com/studio.__n?igsh=ODJ5Z2J3djRrbWgy"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="font-cormorant-sc font-light text-neutral-900 uppercase tracking-insta text-xs sm:text-sm no-underline pb-0.5 insta-handle"
//             >
//               @studio.__n
//             </a>
//           </div>

//         </div>

//         {/* ── Divider ── */}
//         <div
//           className={`w-full h-px bg-stone-200 mt-20 reveal${visible ? " in" : ""}`}
//           style={{ transitionDelay: visible ? "700ms" : "0ms" }}
//         />
//       </section>
//     </>
//   );
// }
import { useEffect, useRef, useState } from "react";

const API = "http://localhost:1337";
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
      const res = await fetch(
        `${API}/api/instagram-images?populate=*&sort=order:asc`
      );
      const data = await res.json();

      const imgs = data.data.map((item: any, i: number) => ({
        id: item.id,
        src: API + item.image.url,
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