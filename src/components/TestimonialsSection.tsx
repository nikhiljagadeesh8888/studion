import { motion } from "framer-motion";
import testimonialsBg from "@/assets/testimonials-bg.jpg";

const testimonials = [
  {
    couple: "Sarah & James",
    text: "Studio N captured our wedding beautifully. Every photo feels like a work of art — the attention to detail and ability to capture genuine emotions was extraordinary. We couldn't be happier with the results!",
  },
  {
    couple: "Priya & Arjun",
    text: "From the first consultation to the final gallery, the experience was seamless. The photos are breathtaking — natural, elegant, and full of emotion. We've received so many compliments from friends and family!",
  },
  {
    couple: "Emily & Tom",
    text: "The editorial style is exactly what we dreamed of. Studio N made us feel so comfortable on the day, and the photos reflect that perfectly. They're timeless and we'll treasure them forever.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="relative py-20 md:py-32 px-6">
      <div className="absolute inset-0">
        <img
          src={testimonialsBg}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-heading text-center mb-16"
        >
          What Clients Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.couple}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center"
            >
              <h3 className="font-serif text-xl md:text-2xl uppercase tracking-[0.15em] text-foreground mb-4">
                {t.couple}
              </h3>
              <div className="w-16 h-[1px] bg-border mx-auto mb-6" />
              <p className="body-text text-sm md:text-base leading-relaxed">"{t.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
