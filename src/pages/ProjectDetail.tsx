
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const API = import.meta.env.VITE_API_URL;

interface GalleryItem {
  src: string;
  alt: string;
}

interface Project {
  slug: string;
  title: string;
  subtitle: string;
  tags: string;
  date: string;
  heroImage: string;
  description: string;
  gallery: GalleryItem[];
}

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
  const fetchProject = async () => {
    try {
      const res = await fetch(`${API}/api/projects?populate=*`);
      const data = await res.json();

      const projects: Project[] = (data?.data || []).map((item: any) => ({
        slug: item.slug,
        title: item.title,
        subtitle: item.subtitle,
        tags: item.tags,
        date: item.date,
        description: item.description,

        // ✅ SAFE HERO IMAGE
        heroImage: item.heroImage?.url
          ? `${API}${item.heroImage.url}`
          : "",

        // ✅ SAFE GALLERY
        gallery: (item.gallery || []).map((img: any) => ({
          src: img?.url ? `${API}${img.url}` : "",
          alt: item.title,
        })),
      }));

      const found = projects.find((p) => p.slug === slug);
      setProject(found || null);
    } catch (error) {
      console.error("Error loading project:", error);
    }
  };

  fetchProject();
}, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="section-heading mb-4">Project Not Found</h1>
          <Link to="/" className="btn-outline-editorial inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
        <img
          src={project.heroImage}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-white text-2xl md:text-4xl lg:text-5xl uppercase tracking-[0.12em] font-light max-w-4xl leading-tight"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-white/80 text-xs md:text-sm uppercase tracking-[0.3em] mt-6"
          >
            {project.tags}
          </motion.p>
        </div>
      </section>

      {/* Content Card */}
      <section className="px-6 -mt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-3xl mx-auto bg-background py-16 px-8 md:px-16 text-center"
        >
          <h2 className="font-serif text-foreground text-2xl md:text-3xl lg:text-4xl italic font-light leading-snug mb-6">
            {project.subtitle}
          </h2>

          <p className="font-serif text-muted-foreground text-sm tracking-[0.15em] mb-8">
            {project.date}
          </p>

          <p className="body-text text-muted-foreground max-w-xl mx-auto">
            {project.description}
          </p>
        </motion.div>
      </section>

      {/* Photo Gallery */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col gap-3">
            {chunkGallery(project.gallery).map((row, rowIdx) => (
              <div
                key={rowIdx}
                className={`grid gap-3 ${
                  row.length === 3
                    ? "grid-cols-1 md:grid-cols-3"
                    : row.length === 2
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {row.map((photo, i) => (
                  <motion.div
                    key={`${rowIdx}-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="overflow-hidden"
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 hover:scale-[1.02]"
                    />
                  </motion.div>
                ))}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Back Link */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          <Link
            to="/"
            className="btn-outline-editorial inline-flex items-center gap-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

/* Chunk gallery rows (2,3 pattern) */

function chunkGallery(gallery: GalleryItem[]): GalleryItem[][] {
  const rows: GalleryItem[][] = [];
  let i = 0;
  const pattern = [2, 3];
  let patternIdx = 0;

  while (i < gallery.length) {
    const size = pattern[patternIdx % pattern.length];
    rows.push(gallery.slice(i, i + size));
    i += size;
    patternIdx++;
  }

  return rows;
}

export default ProjectDetail;
