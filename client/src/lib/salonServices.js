export const SALON_SERVICES = [
  {
    id: "haircut-women",
    name: "Haircut — Women",
    desc: "Wash, cut and blow-dry styled to your preference.",
    price: 399,
    duration: "45 min",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSob5LIckyxHWxYSgbeYS-we3TJgLsqDOAB8aadh_LRmcCE-3bTJ4DlPMeZ&s=10",
  },
  {
    id: "haircut-men",
    name: "Haircut — Men",
    desc: "Classic or modern cut, includes a clean beard trim.",
    price: 199,
    duration: "30 min",
    image: "https://s3-ap-southeast-1.amazonaws.com/urbanclap-prod/images/growth/home-screen/1649825443679-d2e962.jpeg",
  },
  {
    id: "hair-colour-global",
    name: "Hair Colour (Global)",
    desc: "Full-length colour application with ammonia-free product.",
    price: 1499,
    duration: "90 min",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA8PyAVIivqQSMhOMPGhNTJaQcEBEos9ZzWqtRnYY-Cg&s",
  },
  {
    id: "hair-colour-touchup",
    name: "Hair Colour (Root Touch-up)",
    desc: "Root-only touch-up for regrowth, quicker than a full colour.",
    price: 899,
    duration: "60 min",
    image: "https://s3-ap-southeast-1.amazonaws.com/urbanclap-prod/images/growth/luminosity/1646140571372-aa78b8.png",
  },
  {
    id: "cut-massage-combo",
    name: "Haircut + Head Massage",
    desc: "A haircut followed by a relaxing 15-minute head & shoulder massage.",
    price: 599,
    duration: "60 min",
    image: "https://s3-ap-southeast-1.amazonaws.com/urbanclap-prod/images/growth/home-screen/1649825438671-f6af07.jpeg",
  },
  {
    id: "hair-spa",
    name: "Hair Spa & Deep Conditioning",
    desc: "Deep-conditioning spa treatment for dry or damaged hair.",
    price: 799,
    duration: "60 min",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn7Mw2jMvrBvrRb06EAw5Q60sK1cJmShO5eTN1LJ40YKSlyZMWVjWioxWO&s=10",
  },
  {
    id: "mani-pedi",
    name: "Manicure & Pedicure",
    desc: "Full mani-pedi with nail shaping, buffing and polish.",
    price: 599,
    duration: "60 min",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ77Q3IQwxFyp6Ltz08wa8jv27lRHpkcOZTWUF2asu15mZL9XpeLMX4GPY3&s=10",
  },
  {
    id: "threading-waxing",
    name: "Threading & Waxing",
    desc: "Eyebrow threading plus arm or underarm waxing.",
    price: 249,
    duration: "30 min",
    image: "https://s3-ap-southeast-1.amazonaws.com/urbanclap-prod/images/supply/customer-app-supply/1770658700508-d65be3.jpeg",
  },
];

export function formatINR(n) {
  return `₹${n.toLocaleString("en-IN")}`;
}