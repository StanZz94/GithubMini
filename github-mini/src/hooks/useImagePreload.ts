// useImagePreload.ts
import { useEffect, useState } from "react";

export function useImagePreload(images: string[]) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;

    const imageObjects = images.map((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setLoaded(true);
        }
      };
      return img;
    });

    return () => {
      imageObjects.forEach((img) => (img.onload = null));
    };
  }, [images]);

  return loaded;
}