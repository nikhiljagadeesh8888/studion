
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

interface Service {
  title: string;
  description: string;
  image: string;
}

const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(
          `${API}/api/service-images?populate=*&sort=order:asc`
        );

        const data = await res.json();

        const formatted = data.data.map((item: any) => ({
          title: item.title,
          description: item.description,
          image: `${API}${item.image?.url}`,
        }));

        setServices(formatted);
      } catch (error) {
        console.error("Error loading services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <section id="services" className="py-20 md:py-32 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-heading text-center mb-16"
        >
          Services
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group cursor-pointer"
            >

              <div className="overflow-hidden mb-6">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <h3 className="font-serif text-lg md:text-xl uppercase tracking-[0.15em] text-foreground mb-2">
                {service.title}
              </h3>

              <p className="body-text text-sm text-muted-foreground">
                {service.description}
              </p>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
