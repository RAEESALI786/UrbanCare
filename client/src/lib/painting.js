// Base labour+standard-paint price per home size (UrbanCare supplies the paint)
export const BHK_OPTIONS = [
  { id: "1bhk", label: "1 BHK", rooms: "1 bedroom, hall, kitchen", basePrice: 8999, days: "1–2 days", image: "https://yespainter.com/wp-content/uploads/2023/01/1bhk-house-2.jpg" },
  { id: "2bhk", label: "2 BHK", rooms: "2 bedrooms, hall, kitchen", basePrice: 13999, days: "2–3 days", image: "https://yespainter.com/wp-content/uploads/2023/02/2-bhk.jpg" },
  { id: "3bhk", label: "3 BHK", rooms: "3 bedrooms, hall, kitchen", basePrice: 18999, days: "3–4 days", image: "https://aapkapainter.com/blog/wp-content/uploads/2023/01/3bhk.png" },
  { id: "5bhk", label: "5 BHK", rooms: "5 bedrooms, hall, kitchen, dining", basePrice: 27999, days: "4–6 days", image: "https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/sites/2/2025/09/18105343/house-painting-colours-trends-for-2025.jpg" },
];

// Who supplies the paint — buying it yourself knocks a chunk off the labour+material price
export const MATERIAL_OPTIONS = [
  {
    id: "urbancare-supplies",
    label: "UrbanCare supplies the paint",
    desc: "We bring the paint in the finish you choose below — nothing else to arrange.",
    priceAdjustment: 0,
    image: "https://www.urbancompany.com/img/images/growth/luminosity/1660127054902-06f47b.jpeg?bucket=urbanclap-prod&quality=90&format=auto&width=400&dpr=2",
  },
  {
    id: "buy-yourself",
    label: "I'll buy the paint myself",
    desc: "You purchase the paint — we send only the painting crew and charge labour only.",
    priceAdjustment: -3500,
    image: "https://www.urbancompany.com/img/images/growth/blog/1718111384046-8ec7fe.jpeg?bucket=urbanclap-stage&quality=90&format=auto&dpr=2",
  },
];

// Paint finish upgrades — only shown when UrbanCare is supplying the paint
export const PAINT_TYPES = [
  { id: "distemper", label: "Distemper", desc: "Economy finish, budget-friendly.", priceAdjustment: 0 ,  image: "https://content.jdmagicbox.com/quickquotes/images_main/asian-paints-tractor-uno-acrylic-distemper-paint-2189783923-giu0ktoy.jpg?impolicy=queryparam&im=Resize=(360,360),aspect=fit", },
  { id: "emulsion", label: "Emulsion Paint", desc: "Smooth matte finish, washable.", priceAdjustment: 2000,  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfyRzyQ34YR5HJzvf5X15UYnHrTBKqIf-bk7NekMHdLMo3SV0IN8taPRc&s=10", },
  { id: "royal", label: "Royal / Premium Emulsion", desc: "Rich finish with a long-lasting sheen.", priceAdjustment: 4500, image: "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-royale-luxury-emulsion-asian-paints.png" },
  { id: "weatherproof", label: "Weatherproof Exterior", desc: "For exterior walls exposed to sun and rain.", priceAdjustment: 3500, image: "https://m.media-amazon.com/images/I/31wJTvT9fEL.jpg" },
];

export const ADD_ONS = [
  { id: "remove-old-paint", label: "Remove old paint (scraping)", desc: "Full scraping of old, flaking paint before the new coat.", price: 1500,  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe8p6nSR9PuAuGdz9Wk6kVkqfXI6TKdfs3eL_qZrIe2ERoXtQoaJCyYzM&s=10", },
  { id: "putty-primer", label: "Wall putty & primer coat", desc: "Smoothens walls and improves paint finish & life.", price: 1200, image: "https://indigopaints.com/wp-content/uploads/2020/09/691540513.webp" },
  { id: "ceiling", label: "Ceiling painting", desc: "Include ceilings in every room, not just walls.", price: 1800, image: "https://5.imimg.com/data5/SELLER/Default/2024/5/422537540/BV/WA/FM/159346520/gypsum-ceiling-500x500.jpeg" },
];

export function formatINR(n) {
  return `₹${n.toLocaleString("en-IN")}`;
}