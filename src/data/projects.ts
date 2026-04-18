
// export interface Project {
//   slug: string;
//   title: string;
//   subtitle: string;
//   tags: string;
//   date: string;
//   heroImage: string;
//   description: string;
//   gallery: { src: string; alt: string }[];
// }

// const API = "http://localhost:1337";

// export async function getProjects(): Promise<Project[]> {
//   const res = await fetch(`${API}/api/projects?populate=*`);
//   const data = await res.json();

//   return data.data.map((item: any) => ({
//     slug: item.slug,
//     title: item.title,
//     subtitle: item.subtitle,
//     tags: item.tags,
//     date: item.date,
//     heroImage: API + item.heroImage.url,
//     description: item.description,
//     gallery: item.gallery.map((img: any) => ({
//       src: API + img.url,
//       alt: item.title,
//     })),
//   }));
// }
export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  tags: string;
  date: string;
  heroImage: string;
  description: string;
  gallery: { src: string; alt: string }[];
}

const API = import.meta.env.VITE_API_URL;

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API}/api/projects?populate=*`);
  const data = await res.json();

  return (data?.data || []).map((item: any) => ({
    slug: item.slug,
    title: item.title,
    subtitle: item.subtitle,
    tags: item.tags,
    date: item.date,
    description: item.description,

    // ✅ FIXED IMAGE
    heroImage: item.heroImage?.url
      ? `${API}${item.heroImage.url}`
      : "",

    // ✅ FIXED GALLERY
    gallery: (item.gallery || []).map((img: any) => ({
      src: img?.url ? `${API}${img.url}` : "",
      alt: item.title,
    })),
  }));
}
