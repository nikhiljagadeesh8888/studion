import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 md:py-32 px-6 bg-secondary">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="section-subheading mb-2">Get In Touch</p>
          <h2 className="section-heading mb-12">Contact</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20"
        >
          {/* Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-lg uppercase tracking-[0.15em] text-foreground mb-3">Phone</h3>
              <p className="body-text text-sm">
                <a href="tel:+447309985613" className="hover:text-primary transition-colors">+44 7309 985613</a>
              </p>
              <p className="body-text text-sm">
                <a href="tel:+918639147987" className="hover:text-primary transition-colors">+91 8639 147987</a>
              </p>
            </div>
            <div>
              <h3 className="font-serif text-lg uppercase tracking-[0.15em] text-foreground mb-3">Email</h3>
              <p className="body-text text-sm">
                <a href="mailto:nikhiljagadeesh8888@gmail.com" className="hover:text-primary transition-colors">
                  nikhiljagadeesh8888@gmail.com
                </a>
              </p>
            </div>
            <div>
              <h3 className="font-serif text-lg uppercase tracking-[0.15em] text-foreground mb-3">Location</h3>
              <p className="body-text text-sm">37 Myrtle Road</p>
              <p className="body-text text-sm">Leicester, LE2 1FU</p>
            </div>
            <div className="flex gap-6 pt-2">
              <a
                href="https://www.instagram.com/studio.__n?igsh=ODJ5Z2J3djRrbWgy"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link text-xs"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/nikhil-jagadeesh-893374153"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link text-xs"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Form */}
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = "mailto:nikhiljagadeesh8888@gmail.com";
            }}
          >
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-transparent border-b border-border py-3 text-sm font-serif text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-transparent border-b border-border py-3 text-sm font-serif text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
            <div>
              <select className="w-full bg-transparent border-b border-border py-3 text-sm font-serif text-muted-foreground focus:outline-none focus:border-foreground transition-colors">
                <option value="">Select Service</option>
                <option value="wedding">Wedding Photography</option>
                <option value="portrait">Portrait Photography</option>
                <option value="product">Product Photography</option>
                <option value="model">Model Photography</option>
              </select>
            </div>
            <div>
              <textarea
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full bg-transparent border-b border-border py-3 text-sm font-serif text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
              />
            </div>
            <button type="submit" className="btn-outline-editorial w-full sm:w-auto">
              Send Enquiry
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
