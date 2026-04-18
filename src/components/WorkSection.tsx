// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { projects } from "@/data/projects";

// const WorkSection = () => {
//   return (
//     <section id="work" className="py-20 md:py-32 px-6">
//       <div className="max-w-7xl mx-auto">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="section-heading text-center mb-16"
//         >
//           Selected Work
//         </motion.h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {projects.map((project, i) => (
//             <Link to={`/project/${project.slug}`} key={project.slug}>
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: i * 0.15 }}
//                 className="group cursor-pointer"
//               >
//                 <div className="overflow-hidden mb-5">
//                   <img
//                     src={project.heroImage}
//                     alt={project.title}
//                     className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
//                   />
//                 </div>
//                 <h3 className="font-serif text-base md:text-lg uppercase tracking-[0.1em] text-foreground text-center mb-2">
//                   {project.title}
//                 </h3>
//                 <p className="font-serif italic text-sm text-muted-foreground text-center">{project.tags}</p>
//                 <div className="flex justify-center mt-3">
//                   <span className="text-foreground text-lg group-hover:translate-x-1 transition-transform">→</span>
//                 </div>
//               </motion.div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WorkSection;
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const API = "http://localhost:1337";

interface Project {
  slug: string;
  title: string;
  tags: string;
  heroImage: string;
}

const WorkSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API}/api/projects?populate=*`);
        const data = await res.json();

        const formatted: Project[] = data.data.map((item: any) => ({
          slug: item.slug,
          title: item.title,
          tags: item.tags,
          heroImage: API + item.heroImage.url,
        }));

        setProjects(formatted);
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="work" className="py-20 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-heading text-center mb-16"
        >
          Selected Work
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {projects.map((project, i) => (
            <Link to={`/project/${project.slug}`} key={project.slug}>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group cursor-pointer"
              >

                <div className="overflow-hidden mb-5">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <h3 className="font-serif text-base md:text-lg uppercase tracking-[0.1em] text-foreground text-center mb-2">
                  {project.title}
                </h3>

                <p className="font-serif italic text-sm text-muted-foreground text-center">
                  {project.tags}
                </p>

                <div className="flex justify-center mt-3">
                  <span className="text-foreground text-lg group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>

              </motion.div>

            </Link>
          ))}

        </div>

      </div>
    </section>
  );
};

export default WorkSection;