export type AwardItem = {
  slug: string;
  title: string;
  coverImage: string;
  images: string[];
  description: string[];
};

export const awards: AwardItem[] = [
  {
    slug: "awe-programme",
    title: "AWE Programme",
    coverImage: "/assets/AWARDS/awe-programme/cover.jpg",
    images: [
      "/assets/AWARDS/awe-programme/cover.jpg",
      "/assets/AWARDS/awe-programme/2.jpg",
      "/assets/AWARDS/awe-programme/3.jpg",
    ],
    description: [
      "Family Script was selected among the top 16 ventures from 400 applications nationwide for the Aspiring Women Entrepreneurs (AWE) Programme. Sponsored by the U.S. Department of State and conducted by the University of Texas at Austin with the Nexus Startup Hub, American Center, New Delhi, the programme included training in Delhi and Austin.",

      "Family Script was also among eight business innovations selected for pitching in Austin. Through the programme, the venture received focused mentorship to strengthen its business model, assess market potential, and explore commercialization strategies. The programme concluded with a final pitch at the American Center, New Delhi, before representatives from the U.S. Embassy, NITI Aayog, FICCI and the Department of Science and Technology.",
    ],
  },

  {
    slug: "ux-india-2025",
    title: "UX India 2025",
    coverImage: "/assets/AWARDS/ux-india-2025/cover.jpg",
    images: [
      "/assets/AWARDS/ux-india-2025/cover.jpg",
      "/assets/AWARDS/ux-india-2025/2.jpg",
      "/assets/AWARDS/ux-india-2025/3.jpg",
    ],
    description: [
      "Family Script won the UX India 2025 Design Pitch Competition, emerging from a pool of 149 global entries. The recognition marked an important milestone in the organisation’s journey, placing its work within a wider international design and innovation ecosystem. As part of the competition, Family Script presented its idea in Hyderabad before a panel of leading investors, industry experts, and members of the design community.",

      "The experience offered an opportunity to articulate the organisation’s vision, demonstrate the relevance of its work, and engage with perspectives from across the startup and design landscape. The win reinforced Family Script’s growing presence at the intersection of storytelling, design, documentation, and innovation, while opening new conversations around the future potential and scalability of its practice.",
    ],
  },

  {
    slug: "india-impact-ai-summit-2026",
    title: "India Impact AI Summit 2026",
    coverImage: "/assets/AWARDS/india-impact-ai-summit-2026/cover.jpg",
    images: [
      "/assets/OurJourney/2026.jpg",
      "/assets/AWARDS/india-impact-ai-summit-2026/2.jpg",
      "/assets/AWARDS/india-impact-ai-summit-2026/3.jpg",
    ],
    description: [
      "Family Script showcased its Digital Model at the India Impact AI Summit 2026, representing startups promoted by the Government of Delhi. The platform provided an opportunity to present the organisation’s evolving digital approach to documentation, storytelling, and archival engagement before a wider audience of policymakers, institutions, innovators, and technology-led enterprises.",

      "Participation in the summit positioned Family Script within ongoing conversations around the role of artificial intelligence and digital systems in shaping future-facing cultural and knowledge practices. It also enabled the team to engage with new institutional networks, explore potential collaborations, and identify opportunities for extending its work across sectors. The experience marked an important step in strengthening Family Script’s presence within India’s emerging innovation and digital ecosystem.",
    ],
  },
];

export function getAwardBySlug(slug: string): AwardItem | undefined {
  return awards.find((award) => award.slug === slug);
}
