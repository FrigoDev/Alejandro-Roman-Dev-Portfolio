import React, { useEffect, useRef, useState } from "react";

interface ProjectVideoProps {
  src: string;
  poster?: string;
  name: string;
}

const ProjectVideo = ({ src, poster, name }: ProjectVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const node = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video overflow-hidden rounded-2xl bg-slate-800"
    >
      {shouldLoad ? (
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`Demo video of ${name}`}
          className="h-full w-full object-cover"
        />
      ) : poster ? (
        <img
          src={poster}
          alt={`${name} preview`}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="h-full w-full bg-slate-800" aria-hidden />
      )}
    </div>
  );
};

export default ProjectVideo;
