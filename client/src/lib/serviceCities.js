export const SERVICEABLE_CITIES = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Pune",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
];

export const isServiceable = (city) =>
  Boolean(city) && SERVICEABLE_CITIES.some((c) => c.toLowerCase() === city.toLowerCase());
