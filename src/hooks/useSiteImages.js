
import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

const MAX_AGE_MS = 5 * 60 * 1000;

let cachedPromise = null;
let cachedAt = 0;

function loadSiteImages() {
  const now = Date.now();

  if (!cachedPromise || now - cachedAt > MAX_AGE_MS) {
    cachedAt = now;

    cachedPromise = api
      .get("/site-images")
      .then(({ data }) => data || {})
      .catch(() => {
        cachedPromise = null;
        return {};
      });
  }

  return cachedPromise;
}

export default function useSiteImages() {
  const [images, setImages] = useState({});

  useEffect(() => {
    let cancelled = false;

    loadSiteImages().then((data) => {
      if (!cancelled) {
        setImages(data);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return images;
}
