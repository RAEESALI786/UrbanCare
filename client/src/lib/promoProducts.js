export const PROMO_PRODUCTS = {
  "water-purifier": {
    slug: "water-purifier",
    name: "Water Purifier — Install & Service",
    tagline: "3-year filter life. 3-year unconditional warranty.",
    desc: "Professional installation of your new water purifier, including wall mounting, plumbing connection, and a full demo of filter care.",
    price: "₹1,499",
    duration: "45–60 min",
    image: "https://livpure.com/cdn/shop/articles/family-spending-time-together-outside_23-2148659464_c1d9a034-3bff-4de0-a3c5-7828aa0ec439.jpg?v=1696920137&width=1100",
  },
  "wall-panels": {
    slug: "wall-panels",
    name: "Wall Panels — Installation",
    tagline: "Level up your walls",
    desc: "Measurement, fitting and finishing of decorative wall panels in the room of your choice, including TV-panel setups.",
    price: "₹2,999 per room",
    duration: "3–5 hrs",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThdmdADW2FBKGfWurzrlaSHctAI4a2GrlfycdJlf20N4C-ZS6HteA4Fq9Y&s=10",
  },
};

export const getPromoProduct = (slug) => PROMO_PRODUCTS[slug];