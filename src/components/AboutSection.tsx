
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const AboutSection = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          `${API}/api/about-images?populate=*&sort=order:asc`
        );
        const data = await res.json();

        const imgs = data.data.map(
  (item: any) => `${API}${item.image?.url}`
);

        setImages(imgs);
      } catch (error) {
        console.error("Error loading about images:", error);
      }
    };

    fetchImages();
  }, []);

  if (!images.length) return null;

  return (
    <section id="about" className="py-20 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Images */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="relative"
          >
            <div className="relative">
              <p className="section-heading text-sm md:text-base leading-relaxed uppercase tracking-[0.2em] text-muted-foreground mb-6 max-w-md">
                I'm passionate about capturing stylish, bold and romantic moments with an editorial flair — specialising in digital & film
              </p>

              <img
                src={images[0]}
                alt="Bridal portrait"
                className="w-full max-w-lg ml-auto object-cover aspect-[3/4]"
              />
            </div>

            <img
              src={images[1]}
              alt="Wedding couple"
              className="w-2/3 max-w-sm object-cover aspect-[4/5] -mt-32 relative z-10"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="lg:pt-20"
          >
            <p className="section-subheading mb-2">My</p>
            <h2 className="section-heading mb-8">Approach</h2>

            <div className="body-text space-y-6 max-w-lg">
              <p>
                I take a relaxed, thoughtful approach to photography, quietly observing, gently guiding when needed, and always tuned in to the feeling of the moment.
              </p>

              <p>
                From natural, documentary moments to editorial style portraits with a refined edge, I capture every moment in a way that feels effortless and true to you.
              </p>

              <p>
                I'm especially passionate about a strong sense of style, where architecture, fashion-forward details, and bold design elements come together to create something striking and unique.
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() =>
                  document
                    .getElementById("work")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-outline-editorial"
              >
                Work
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-outline-editorial"
              >
                Contact
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
