import type { CSSProperties } from 'react';
import { backgroundPhotos } from '@/config/photo-collections';
export function FloatingMemories() {
  return <div className="floating-memories" aria-hidden="true">{backgroundPhotos.map((src,index) => <img key={src} src={src} alt="" loading="lazy" style={{'--memory-index':index} as CSSProperties} />)}</div>;
}
