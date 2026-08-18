import { SERVICES } from "./services";
import { PROMO_PRODUCTS } from "./promoProducts";

// The 6 core services link to their booking flow, the 2 promo products
// link to their order page — same routes used elsewhere on the site.
export const QUICK_LINKS = [
  ...SERVICES.map((s) => ({
    key: s.slug,
    name: s.name,
    image: s.image,
    to: `/services/${s.slug}`,
  })),
  ...Object.values(PROMO_PRODUCTS).map((p) => ({
    key: p.slug,
    name: p.name.split("—")[0].trim(),
    image: p.image,
    to: `/order/${p.slug}`,
  })),
];
