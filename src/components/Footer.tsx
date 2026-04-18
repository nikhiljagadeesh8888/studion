import logo from "@/assets/logo.jpg";

const navItems = ["Home", "About", "Services", "Work", "Contact"];

const scrollTo = (id: string) => {
  document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
};

const Footer = () => {
  return (
    <footer className="px-6 md:px-12 lg:px-20">
      {/* PARTITION 1: About blurb (left) | Recent Work links (right) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-8 md:gap-12 py-16 md:py-24">
        {/* Left */}
        <div>
          <h3 className="font-serif text-foreground text-xl md:text-2xl lg:text-3xl font-light leading-snug uppercase mb-6">
            Studio N is an editorial<br />
            photographer, based<br />
            in Leicester, UK.
          </h3>
          <p className="body-text text-sm text-muted-foreground max-w-md">
            Studio N's style is editorial with a relaxed documentary feel. Specialising in portrait, wedding, product and model photography across the UK and destination shoots worldwide.
          </p>
        </div>

        {/* Vertical divider */}
        <div className="hidden md:block bg-border" />

        {/* Right */}
        <div className="md:pl-8">
          <h4 className="font-serif text-foreground text-lg uppercase tracking-[0.15em] mb-6">Recent Work</h4>
          <ul className="space-y-3">
            <li><span className="font-serif text-muted-foreground text-sm underline underline-offset-4 decoration-border cursor-pointer hover:text-foreground transition-colors">Golden Hour Wedding at the Manor</span></li>
            <li><span className="font-serif text-muted-foreground text-sm underline underline-offset-4 decoration-border cursor-pointer hover:text-foreground transition-colors">Editorial Bridal Portrait Session</span></li>
            <li><span className="font-serif text-muted-foreground text-sm underline underline-offset-4 decoration-border cursor-pointer hover:text-foreground transition-colors">Fashion Model Shoot in Leicester</span></li>
          </ul>
        </div>
      </div>

      {/* PARTITION 2: Logo divider */}
      <div className="max-w-6xl mx-auto flex items-center gap-6 py-4">
  <div className="flex-1 h-[1px] bg-border" />
  <img src={logo} alt="Studio N" className="h-14 w-auto" />
  <div className="flex-1 h-[1px] bg-border" />
</div>

      {/* PARTITION 3: Social / Instagram (left) | Pages (right) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-8 md:gap-12 py-16 md:py-24">
        {/* Left - social links */}
        <div className="flex flex-col gap-6">
          <h4 className="font-serif text-foreground text-lg uppercase tracking-[0.15em]">Follow Along</h4>
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/studio.__n?igsh=ODJ5Z2J3djRrbWgy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-muted-foreground text-sm underline underline-offset-4 decoration-border hover:text-foreground transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/in/nikhil-jagadeesh-893374153"
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-muted-foreground text-sm underline underline-offset-4 decoration-border hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
          </div>
          <div className="mt-4">
            <p className="font-serif text-muted-foreground text-sm">
              <a href="mailto:nikhiljagadeesh8888@gmail.com" className="underline underline-offset-4 decoration-border hover:text-foreground transition-colors">
                nikhiljagadeesh8888@gmail.com
              </a>
            </p>
            <p className="font-serif text-muted-foreground text-sm mt-2">
              <a href="tel:+447309985613" className="hover:text-foreground transition-colors">+44 7309 985613</a>
            </p>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="hidden md:block bg-border" />

        {/* Right - pages */}
        <div className="md:pl-8">
          <h4 className="font-serif text-foreground text-lg uppercase tracking-[0.15em] mb-6">Pages</h4>
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollTo(item)}
                  className="font-serif text-muted-foreground text-sm hover:text-foreground transition-colors underline underline-offset-4 decoration-border"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* PARTITION 4: Bottom nav + back to top + copyright */}
      <div className="max-w-6xl mx-auto border-t border-border">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-10 gap-8">
          <div className="grid grid-cols-2 gap-x-20 gap-y-3">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="nav-link text-left text-xs"
              >
                {item}
              </button>
            ))}
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-foreground text-2xl hover:text-primary transition-colors"
            aria-label="Back to top"
          >
            ↑
          </button>
        </div>
        <div className="border-t border-border py-6">
          <p className="font-serif text-sm text-muted-foreground">
            All content Copyright © {new Date().getFullYear()} Studio N Photography
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
