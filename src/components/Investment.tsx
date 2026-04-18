import { useState, useEffect, useRef } from "react";

const Investment = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [packageVisible, setPackageVisible] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const packageRef = useRef<HTMLDivElement>(null);
  const API = import.meta.env.VITE_API_URL;
  const [longSessionImage, setLongSessionImage] = useState("");
  const [hourlyImage, setHourlyImage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === textRef.current && entry.isIntersecting) {
            setTextVisible(true);
          }
          if (entry.target === packageRef.current && entry.isIntersecting) {
            setPackageVisible(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (textRef.current) observer.observe(textRef.current);
    if (packageRef.current) observer.observe(packageRef.current);

    return () => observer.disconnect();
  }, []);
  useEffect(() => {
  const fetchImages = async () => {
    try {
      const API = import.meta.env.VITE_API_URL;

      const res = await fetch(`${API}/api/investment?populate=*`);
      const data = await res.json();

      const longImg = data?.data?.long_session_image?.url;
      const hourlyImg = data?.data?.hourly_image?.url;

      if (longImg) setLongSessionImage(`${API}${longImg}`);
      if (hourlyImg) setHourlyImage(`${API}${hourlyImg}`);
    } catch (err) {
      console.error("Error fetching images", err);
    }
  };

  fetchImages();
}, []);

  return (
    <div
      className="min-h-screen w-full"
      style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cinzel:wght@400;500&display=swap');

        .hero-text {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1.2s ease, transform 1.2s ease;
        }
        .hero-text.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .hero-subtitle {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 1.4s ease 0.4s, transform 1.4s ease 0.4s;
        }
        .hero-subtitle.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1s ease, transform 1s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .fade-up-delay-1 { transition-delay: 0.15s; }
        .fade-up-delay-2 { transition-delay: 0.3s; }
        .fade-up-delay-3 { transition-delay: 0.45s; }
        .fade-up-delay-4 { transition-delay: 0.6s; }

        .pkg-left {
          opacity: 0;
          transform: translateX(-30px);
          transition: opacity 1.1s ease, transform 1.1s ease;
        }
        .pkg-left.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .pkg-right {
          opacity: 0;
          transform: translateX(30px);
          transition: opacity 1.1s ease 0.2s, transform 1.1s ease 0.2s;
        }
        .pkg-right.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .enquire-btn {
          display: inline-block;
          border: 1px solid #3d3530;
          color: #3d3530;
          background-color: transparent;
          padding: 0.8rem 2.2rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.65rem, 1.3vw, 0.75rem);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
        .enquire-btn:hover {
          background-color: #3d3530;
          color: #ffffff;
          border-color: #3d3530;
        }

        .divider-line {
          width: 100%;
          height: 1px;
          background: #c9bfb5;
          margin: 1rem 0 2rem 0;
        }

        /* ── Package grid — desktop: two columns ── */
        .pkg-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid #ddd8d2;
        }

        /* ── Mobile: single column, image on top, text below ── */
        @media (max-width: 767px) {
          .pkg-grid {
            grid-template-columns: 1fr;
          }
          .pkg-img-cell {
            order: 1;
            padding: 1rem !important;
          }
          .pkg-text-cell {
            order: 2;
          }
          .pkg-text-cell.inner {
            padding: 2rem 1.5rem !important;
          }
        }
      `}</style>

      {/* ─── HERO ────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ height: "90vh", minHeight: "500px" }}>
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1800&q=80')",
            filter: "brightness(0.62)",
          }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(38,28,22,0.38)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1
            className={`hero-text text-white ${heroVisible ? "visible" : ""}`}
            style={{
              fontFamily: "'Cinzel', 'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(1.8rem, 5vw, 3.4rem)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "1.2rem",
            }}
          >
            Working Together
          </h1>
          <p
            className={`hero-subtitle text-white`}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(0.65rem, 1.5vw, 0.85rem)",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
            }}
          >
            What's Included &amp; How It Feels
          </p>
        </div>
      </section>

      {/* ─── PHILOSOPHY TEXT ─────────────────────────────────────── */}
      <section
        ref={textRef}
        className="w-full"
        style={{ background: "#edeae4", padding: "6rem 1.5rem 7rem" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <p
            className={`fade-up ${textVisible ? "visible" : ""}`}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(1rem, 2.2vw, 1.15rem)",
              lineHeight: 1.9,
              color: "#4a4240",
              marginBottom: "2.2rem",
            }}
          >
            My editorial photography approach is rooted in documentary
            storytelling with an editorial flair. I'm there to quietly observe
            and anticipate moments before they unfold, then step in with gentle
            guidance only when it adds something meaningful. The result is a
            curated gallery that feels natural, elegant, and deeply personal —
            creating images that reflect how the day{" "}
            <em style={{ fontStyle: "italic" }}>felt</em>, not just how it looked.
          </p>

          <p
            className={`fade-up fade-up-delay-1 ${textVisible ? "visible" : ""}`}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(1rem, 2.2vw, 1.15rem)",
              lineHeight: 1.9,
              color: "#4a4240",
              marginBottom: "2.8rem",
            }}
          >
            I work with clients who want their day to feel relaxed, meaningful,
            and true to them. Combining honest documentary moments with
            thoughtful editorial direction, I give you space to be present while
            guiding you where it enhances the image — creating work that feels
            natural, elevated, and timeless. Every moment is captured with care
            and intention, from the smallest glances to the most refined portraits.
          </p>

          <div className={`fade-up fade-up-delay-2 ${textVisible ? "visible" : ""}`}>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "clamp(1rem, 2vw, 1.1rem)",
                lineHeight: 2,
                color: "#4a4240",
              }}
            >
              What you're investing in goes beyond coverage hours.
              <br />
              It's experience, creative direction, and a calm presence throughout your day.
            </p>
          </div>
        </div>
      </section>

      {/* ─── PACKAGES ────────────────────────────────────────────── */}
      <section
        ref={packageRef}
        className="w-full"
        style={{ background: "#faf8f5", padding: "6rem 0 0" }}
      >
        {/* <PackageBlock
          visible={packageVisible}
          align="left"
          title="Full Day Coverage"
          subtitle="Perfect for bridal prep to a little after your first dance"
          items={[
            "Full Day coverage – 10 hours",
            "550+ images hand edited in N Studio's signature style, with a mixture of colour and black & whites",
            "Sneak peek of your gallery within 48 hrs of your day",
            "Full gallery delivery within 8 weeks of your session",
            "Your own secure, password-protected online gallery to view, download, share & print at your leisure",
            "No extra charges for travel — available worldwide",
          ]}
          price="Full Day From • £2,695"
          imageUrl="https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=900&q=80"
          imageAlt="Wedding tablescape in black and white"
        /> */}

        <PackageBlock
          visible={packageVisible}
          align="right"
          title="Long Session"
          subtitle="Tailored coverage for extended or multi-location stories"
          items={[
            "Extended coverage – bespoke hours tailored to you",
            "Carefully curated gallery of colour and black & white images",
            "Sneak peek within 48 hrs of your session",
            "Full gallery delivered within 8 weeks",
            "Secure online gallery – view, download, share & print",
            "Available for international travel — contact for details",
          ]}
          price="Long Session From • £1,500 – £2,000"
          imageUrl={longSessionImage}
          imageAlt="Couple portrait session"
        />

        <PackageBlock
          visible={packageVisible}
          align="left"
          title="Hourly Coverage"
          subtitle="Ideal for elopements, intimate ceremonies or special occasions"
          items={[
            "Flexible hourly rate – book exactly what you need",
            "Hand-edited images delivered in N Studio's signature style",
            "Sneak peek within 48 hrs",
            "Full gallery delivered within 6 weeks",
            "Secure online gallery included",
            "Available by pre-booking — get in touch to check availability",
          ]}
          price="Per Hour • £100"
          imageUrl={hourlyImage}
          imageAlt="Intimate elopement ceremony"
        />
      </section>

      {/* ─── FOOTER NOTE ─────────────────────────────────────────── */}
      <section
        style={{
          background: "#faf8f5",
          padding: "5rem 1.5rem 6rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
            color: "#6b5e59",
            letterSpacing: "0.02em",
            lineHeight: 2,
            maxWidth: "560px",
            margin: "0 auto 0.5rem",
          }}
        >
          N Studio is available worldwide by pre-booking.
          <br />
          Business hours are available upon request.
        </p>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(0.7rem, 1.4vw, 0.8rem)",
            color: "#9c908c",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          Every package is tailored — reach out to discuss your vision
        </p>
      </section>
    </div>
  );
};

/* ─── REUSABLE PACKAGE BLOCK ─────────────────────────────────────────── */
interface PackageBlockProps {
  visible: boolean;
  align: "left" | "right";
  title: string;
  subtitle: string;
  items: string[];
  price: string;
  imageUrl: string;
  imageAlt: string;
}

const PackageBlock = ({
  visible,
  align,
  title,
  subtitle,
  items,
  price,
  imageUrl,
  imageAlt,
}: PackageBlockProps) => {
  const isLeft = align === "left";

  const textContent = (
    <div
      className="pkg-text-cell inner flex flex-col justify-center"
      style={{ padding: "clamp(2.5rem, 6vw, 5rem) clamp(2rem, 6vw, 5rem)" }}
    >
      {/* Title */}
      <h2
        className={`pkg-${isLeft ? "left" : "right"} ${visible ? "visible" : ""}`}
        style={{
          fontFamily: "'Cinzel', 'Cormorant Garamond', serif",
          fontWeight: 400,
          fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)",
          color: "#2d2420",
          letterSpacing: "0.04em",
          marginBottom: "1rem",
          textTransform: "uppercase",
        }}
      >
        {title}
      </h2>

      {/* Divider */}
      <div className="divider-line" />

      {/* Subtitle */}
      <p
        className={`pkg-${isLeft ? "left" : "right"} ${visible ? "visible" : ""}`}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400,
          fontSize: "clamp(0.65rem, 1.3vw, 0.78rem)",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#7a6d68",
          marginBottom: "2rem",
          lineHeight: 1.7,
          transitionDelay: "0.1s",
        }}
      >
        {subtitle}
      </p>

      {/* Items */}
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.2rem 0" }}>
        {items.map((item, i) => (
          <li
            key={i}
            className={`pkg-${isLeft ? "left" : "right"} ${visible ? "visible" : ""}`}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(0.95rem, 1.9vw, 1.05rem)",
              color: "#4a4240",
              lineHeight: 1.75,
              marginBottom: "0.55rem",
              paddingLeft: "1.1rem",
              position: "relative",
              transitionDelay: `${0.15 + i * 0.07}s`,
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                top: "0.05em",
                color: "#b8a99e",
                fontSize: "0.7rem",
              }}
            >
              •
            </span>
            {item}
          </li>
        ))}
      </ul>

      {/* Price */}
      <p
        className={`pkg-${isLeft ? "left" : "right"} ${visible ? "visible" : ""}`}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400,
          fontSize: "clamp(1rem, 2vw, 1.15rem)",
          color: "#2d2420",
          marginBottom: "2rem",
          letterSpacing: "0.02em",
          transitionDelay: `${0.15 + items.length * 0.07}s`,
        }}
      >
        {price}
      </p>

      {/* Button */}
      <div>
        <a href="#contact" className="enquire-btn">
          Enquire
        </a>
      </div>
    </div>
  );

  const imageContent = (
    <div
      className="pkg-img-cell"
      style={{ padding: "1.5rem" }}
    >
      <img
        src={imageUrl}
        alt={imageAlt}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          minHeight: "340px",
          maxHeight: "560px",
          objectFit: "cover",
          filter: "brightness(0.92) contrast(1.04)",
        }}
      />
    </div>
  );

  return (
    <div className="pkg-grid">
      {isLeft ? (
        <>
          {textContent}
          {imageContent}
        </>
      ) : (
        <>
          {imageContent}
          {textContent}
        </>
      )}
    </div>
  );
};

export default Investment;
