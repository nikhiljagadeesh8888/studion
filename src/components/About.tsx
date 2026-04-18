
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

const VisionSection = () => {
  const [image, setImage] = useState("");

  useEffect(() => {
  const fetchImage = async () => {
    try {
      const res = await fetch(`${API}/api/myself?populate=image`);
      const data = await res.json();

      console.log(data); // debug

      const img = data?.data?.attributes?.image?.data?.attributes?.url;

      if (img) {
        setImage(`${API}${img}`);
      }
    } catch (err) {
      console.error("Error loading image", err);
    }
  };

  fetchImage();
}, []);

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

        {/* Left - Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-serif text-foreground text-2xl md:text-3xl lg:text-4xl uppercase font-light leading-snug tracking-[0.1em] mb-8">
            Getting to Know You<br />
            and Your Vision Is So<br />
            Important to Me
          </h2>

          <div className="w-24 h-[1px] bg-primary mb-8" />

          <p className="body-text text-muted-foreground mb-10 max-w-md">
            Building a genuine connection with my clients is at the heart of everything I do. I take the time to understand what matters most to you, how you want the day to feel, what moments you're most excited about and what really reflects <em>you</em>. That way, by the time your session arrives, it feels natural, easy, and completely comfortable having me there.
          </p>

          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-outline-editorial inline-block"
          >
            Approach
          </a>
        </motion.div>

        {/* Right - Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="relative">

            <p className="font-serif text-muted-foreground italic text-xl md:text-2xl absolute -top-2 -left-4 md:-left-8 z-10">
              Hey There,<br />I'm Nikhil
            </p>

            <img
              src={image}
              alt="Nikhil - Studio N Photography"
              className="w-full aspect-[3/4] object-cover grayscale"
            />

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default VisionSection;
