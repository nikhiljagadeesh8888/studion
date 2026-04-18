import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.jpg";
const navItems = ["Home", "About", "Investment", "Services", "Work", "Contact"];
const linkItems = ["Investment", "Work", "Contact"];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle scrollTo query param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scrollTo = params.get("scrollTo");
    if (scrollTo) {
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, "", cleanUrl);
      setTimeout(() => {
        const el = document.getElementById(scrollTo.toLowerCase());
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  const isHomePage = () => {
    return (
      window.location.pathname === "/" ||
      window.location.pathname === "/index.html"
    );
  };

  const scrollToSection = (id: string) => {
    setIsOpen(false);

    if (isHomePage()) {
      setTimeout(() => {
        const el = document.getElementById(id.toLowerCase());
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      window.location.href = `/?scrollTo=${id.toLowerCase()}`;
    }
  };

  const getHref = (item: string) => {
    if (item === "Investment") return "/investment";
    if (item === "Work") return "/work";
    if (item === "Contact") return "/contact";
    return "#";
  };

  const renderDesktopItem = (item: string) =>
    linkItems.includes(item) ? (
      <li key={item}>
        <a href={getHref(item)} className="nav-link">
          {item}
        </a>
      </li>
    ) : (
      <li key={item}>
        <button
          onClick={() => scrollToSection(item)}
          className="nav-link"
        >
          {item}
        </button>
      </li>
    );

  const renderMobileItem = (item: string) =>
    linkItems.includes(item) ? (
      <a
        href={getHref(item)}
        onClick={() => setIsOpen(false)}
        className="font-serif text-2xl tracking-[0.2em] uppercase text-foreground hover:text-primary transition-colors"
      >
        {item}
      </a>
    ) : (
      <button
        onClick={() => scrollToSection(item)}
        className="font-serif text-2xl tracking-[0.2em] uppercase text-foreground hover:text-primary transition-colors"
      >
        {item}
      </button>
    );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-background z-[55] flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                {renderMobileItem(item)}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-sm shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <ul className="hidden lg:flex items-center gap-8">
            {navItems.slice(0, 3).map(renderDesktopItem)}
          </ul>

          <button
            onClick={() => scrollToSection("Home")}
            className="flex-shrink-0"
          >
            <img
  src={logo}
  alt="Studio N"
  className="h-14 md:h-16 w-auto"
/>
          </button>

          <ul className="hidden lg:flex items-center gap-8">
            {navItems.slice(3).map(renderDesktopItem)}
          </ul>

          <button
            className="lg:hidden flex flex-col items-end gap-[6px]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block h-[1.5px] w-7 bg-foreground origin-center"
            />
            <motion.span
              animate={
                isOpen ? { opacity: 0, width: 0 } : { opacity: 1, width: 16 }
              }
              className="block h-[1.5px] bg-foreground origin-center"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block h-[1.5px] w-7 bg-foreground origin-center"
            />
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
