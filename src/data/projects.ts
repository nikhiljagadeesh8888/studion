// import heroImg from "@/assets/hero-wedding.jpg";
// import portrait1 from "@/assets/portrait-1.jpg";
// import modelPhoto from "@/assets/model-photo.jpg";
// import weddingCouple from "@/assets/wedding-couple.jpg";
// import productPhoto from "@/assets/product-photo.jpg";

// export interface Project {
//   slug: string;
//   title: string;
//   subtitle: string;
//   tags: string;
//   date: string;
//   heroImage: string;
//   description: string;
//   gallery: { src: string; alt: string; span?: "wide" | "tall" | "normal" }[];
// }

// export const projects: Project[] = [
//   {
//     slug: "golden-hour-wedding",
//     title: "A Golden Hour Wedding — Editorial Photography",
//     subtitle: "A Beautiful Golden Hour Wedding Day at the Manor",
//     tags: "Editorial Weddings · Wedding Venues · Wedding",
//     date: "January 15, 2026",
//     heroImage: heroImg,
//     description:
//       "This stunning golden hour wedding at the manor was an absolute dream to photograph. The warm light, the love between the couple, and the timeless elegance of the venue made for an unforgettable editorial session.",
//     gallery: [
//       { src: heroImg, alt: "Golden hour ceremony", span: "wide" },
//       { src: weddingCouple, alt: "Couple portrait", span: "normal" },
//       { src: portrait1, alt: "Bridal detail", span: "tall" },
//       { src: productPhoto, alt: "Table setting", span: "normal" },
//       { src: modelPhoto, alt: "Getting ready", span: "normal" },
//       { src: heroImg, alt: "Sunset moment", span: "wide" },
//       { src: weddingCouple, alt: "First dance", span: "normal" },
//       { src: portrait1, alt: "Ring detail", span: "normal" },
//       { src: modelPhoto, alt: "Candid moment", span: "tall" },
//     ],
//   },
//   {
//     slug: "dramatic-bridal-portrait",
//     title: "Dramatic Bridal Portrait — Studio Session",
//     subtitle: "An Intimate Bridal Portrait Session in the Studio",
//     tags: "Portrait · Bridal · Studio",
//     date: "December 8, 2025",
//     heroImage: portrait1,
//     description:
//       "A dramatic and intimate bridal portrait session captured in our studio. Moody lighting and elegant styling created timeless images that celebrate the beauty of the bride.",
//     gallery: [
//       { src: portrait1, alt: "Bridal portrait", span: "wide" },
//       { src: heroImg, alt: "Veil detail", span: "normal" },
//       { src: modelPhoto, alt: "Studio lighting", span: "tall" },
//       { src: weddingCouple, alt: "Couple session", span: "normal" },
//       { src: productPhoto, alt: "Bouquet detail", span: "normal" },
//       { src: portrait1, alt: "Close-up portrait", span: "wide" },
//     ],
//   },
//   {
//     slug: "fashion-editorial",
//     title: "Fashion Editorial — Moody Studio Shoot",
//     subtitle: "A Moody Fashion Editorial in Our Leicester Studio",
//     tags: "Model · Fashion · Editorial",
//     date: "November 20, 2025",
//     heroImage: modelPhoto,
//     description:
//       "A high-fashion editorial shoot with dramatic lighting and bold styling. This moody studio session pushed creative boundaries and resulted in striking, magazine-worthy imagery.",
//     gallery: [
//       { src: modelPhoto, alt: "Fashion portrait", span: "wide" },
//       { src: portrait1, alt: "Styling detail", span: "normal" },
//       { src: heroImg, alt: "Dramatic lighting", span: "normal" },
//       { src: productPhoto, alt: "Accessories", span: "tall" },
//       { src: weddingCouple, alt: "Behind the scenes", span: "normal" },
//       { src: modelPhoto, alt: "Final look", span: "wide" },
//     ],
//   },
// ];
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

const API = "http://localhost:1337";

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API}/api/projects?populate=*`);
  const data = await res.json();

  return data.data.map((item: any) => ({
    slug: item.slug,
    title: item.title,
    subtitle: item.subtitle,
    tags: item.tags,
    date: item.date,
    heroImage: API + item.heroImage.url,
    description: item.description,
    gallery: item.gallery.map((img: any) => ({
      src: API + img.url,
      alt: item.title,
    })),
  }));
}