import { useRef, useState } from 'react';
import type { CollectionPhoto } from '@/config/photo-collections';
export function PhotoStack({ photos, title }: { photos: CollectionPhoto[]; title: string }) {
  const [index, setIndex] = useState(0);
  const start = useRef<{x: number; y: number} | null>(null);
  const current = photos[index];
  const step = (delta: number) => setIndex(old => (old + delta + photos.length) % photos.length);
  if (!current) return null;
  return <div className="photo-stack" role="group" aria-label={title}>
    <button type="button" className="photo-stack-image" aria-label={`Next photo in ${title}`} onClick={() => step(1)}
      onTouchStart={event => { const t = event.touches[0]; if (t) start.current = {x:t.clientX,y:t.clientY}; }}
      onTouchEnd={event => { const t = event.changedTouches[0]; if (t && start.current) { const dx=t.clientX-start.current.x,dy=t.clientY-start.current.y; if (Math.abs(dx)>45 && Math.abs(dx)>Math.abs(dy)*1.3) { event.preventDefault(); step(dx<0?1:-1); } } start.current=null; }}>
      <img key={current.src} src={current.src} alt={current.alt} loading="lazy" decoding="async" style={current.rotation ? {transform:`rotate(${current.rotation}deg) scale(.9)`} : undefined} />
    </button>
    <div className="photo-stack-controls">
      <button type="button" aria-label={`Previous photo in ${title}`} onClick={() => step(-1)}>← Previous</button>
      <span aria-live="polite">{index + 1} / {photos.length}</span>
      <button type="button" aria-label={`Next photo in ${title}`} onClick={() => step(1)}>Next →</button>
    </div>
  </div>;
}
