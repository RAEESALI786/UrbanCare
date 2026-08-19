import { useEffect, useRef } from "react";

/**
 * Auto-scrolls an error message into view whenever it appears.
 * Usage:
 *   const errorRef = useScrollToError(error);
 *   ...
 *   {error && <div ref={errorRef}>{error}</div>}
 */
export default function useScrollToError(error) {
  const ref = useRef(null);

  useEffect(() => {
    if (error && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [error]);

  return ref;
}