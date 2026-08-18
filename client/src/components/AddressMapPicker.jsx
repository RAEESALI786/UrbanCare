import { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { X, LocateFixed, MapPin, AlertTriangle } from "lucide-react";

const MAP_CONTAINER_STYLE = { width: "100%", height: "320px", borderRadius: "0.75rem" };
const DEFAULT_CENTER = { lat: 19.076, lng: 72.8777 }; // Mumbai, used until we know the user's location

export default function AddressMapPicker({ onConfirm, onClose }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded, loadError } = useJsApiLoader({
    id: "urbancare-google-maps",
    googleMapsApiKey: apiKey || "",
  });

  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [locating, setLocating] = useState(true);
  const [address, setAddress] = useState("");
  const [geocoding, setGeocoding] = useState(false);
  const geocoderRef = useRef(null);

  const reverseGeocode = useCallback((position) => {
    if (!window.google) return;
    if (!geocoderRef.current) geocoderRef.current = new window.google.maps.Geocoder();
    setGeocoding(true);
    geocoderRef.current.geocode({ location: position }, (results, status) => {
      setGeocoding(false);
      if (status === "OK" && results[0]) {
        setAddress(results[0].formatted_address);
      } else {
        setAddress("");
      }
    });
  }, []);

  // Center on the user's current location as soon as the map is ready
  useEffect(() => {
    if (!isLoaded) return;
    if (!navigator.geolocation) {
      setLocating(false);
      reverseGeocode(DEFAULT_CENTER);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const here = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCenter(here);
        setLocating(false);
        reverseGeocode(here);
      },
      () => {
        setLocating(false);
        reverseGeocode(DEFAULT_CENTER);
      }
    );
  }, [isLoaded, reverseGeocode]);

  const handleMarkerDragEnd = (e) => {
    const position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setCenter(position);
    reverseGeocode(position);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const here = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCenter(here);
        setLocating(false);
        reverseGeocode(here);
      },
      () => setLocating(false)
    );
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/50 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-line bg-cream p-5 shadow-lift">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg text-navy">Pin your location</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-ink-soft hover:bg-paper focus-ring"
          >
            <X size={18} />
          </button>
        </div>

        {!apiKey && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-brass/40 bg-brass/10 px-4 py-3 text-sm text-brass-dark">
            <AlertTriangle size={16} className="mt-0.5 shrink-0" />
            <span>
              Google Maps isn't configured yet. Add VITE_GOOGLE_MAPS_API_KEY to client/.env.
            </span>
          </div>
        )}

        {apiKey && loadError && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-brass/40 bg-brass/10 px-4 py-3 text-sm text-brass-dark">
            <AlertTriangle size={16} className="mt-0.5 shrink-0" />
            <span>Couldn't load Google Maps. Check that your API key is valid and unrestricted for this domain.</span>
          </div>
        )}

        {apiKey && !loadError && (
          <>
            <p className="mt-3 text-sm text-ink-soft">
              Drag the pin to your exact location, or move the map and drop it anywhere.
            </p>

            <div className="relative mt-3">
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={MAP_CONTAINER_STYLE}
                  center={center}
                  zoom={16}
                  options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}
                >
                  <MarkerF position={center} draggable onDragEnd={handleMarkerDragEnd} />
                </GoogleMap>
              ) : (
                <div className="grid h-80 place-items-center rounded-xl border border-line bg-paper text-sm text-ink-soft">
                  Loading map…
                </div>
              )}

              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-navy px-3 py-2 text-xs font-semibold text-cream shadow-lift hover:bg-navy-2 focus-ring"
              >
                <LocateFixed size={14} />
                {locating ? "Locating…" : "My location"}
              </button>
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-xl border border-line bg-paper px-4 py-3 text-sm">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brass-dark" />
              <span className="text-ink">
                {geocoding ? "Looking up address…" : address || "Move the pin to select a location"}
              </span>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink-soft hover:border-brass/50 focus-ring"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!address || geocoding}
                onClick={() => onConfirm({ address, lat: center.lat, lng: center.lng })}
                className="rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-cream shadow-ticket hover:bg-navy-2 disabled:opacity-50 focus-ring"
              >
                Use this location
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
