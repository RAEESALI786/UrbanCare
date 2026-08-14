import { createContext, useContext, useEffect, useState } from "react";
import { SERVICEABLE_CITIES } from "../lib/serviceCities";

const LocationContext = createContext(null);
const STORAGE_KEY = "urbancare_city";

export function LocationProvider({ children }) {
  const [city, setCity] = useState(() => localStorage.getItem(STORAGE_KEY) || "");
  const [detecting, setDetecting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (city) localStorage.setItem(STORAGE_KEY, city);
  }, [city]);

  const detectLocation = () => {
    setError("");
    if (!navigator.geolocation) {
      setError("Location isn't supported on this browser. Please select your city manually.");
      return;
    }
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const detected =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.state_district ||
            "";
          if (detected) {
            setCity(detected);
          } else {
            setError("Couldn't determine your city. Please select it manually.");
          }
        } catch {
          setError("Couldn't look up your city. Please select it manually.");
        } finally {
          setDetecting(false);
        }
      },
      () => {
        setError("Location permission denied. Please select your city manually.");
        setDetecting(false);
      }
    );
  };

  return (
    <LocationContext.Provider
      value={{ city, setCity, detectLocation, detecting, error, cities: SERVICEABLE_CITIES }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationCity() {
  return useContext(LocationContext);
}
