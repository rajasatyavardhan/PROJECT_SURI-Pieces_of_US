import { suriConfig } from '@/config/suri.config';
import { galleryCollections } from '@/config/photo-collections';
import { PhotoStack } from '../PhotoStack';
import { Reveal } from '../Reveal';
export function PhotoCollections() {
  return <section className="birthday-section px-5 py-24 sm:px-10 lg:px-16" aria-labelledby="memories-heading">
    <div className="mx-auto max-w-7xl">
      <Reveal><p className="birthday-eyebrow">Our moments</p><h2 id="memories-heading" className="birthday-title mt-5">{suriConfig.birthday.piecesTitle}</h2><p className="mt-5 text-muted-foreground">Six little collections, not six little photos. Tap a photo, swipe, or wander back with Previous.</p></Reveal>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {galleryCollections.map(collection => <Reveal key={collection.title} className="birthday-story-card">
          <PhotoStack photos={collection.photos} title={collection.title} />
          <div className="p-5"><h3 className="font-serif text-2xl">{collection.title}</h3>{'caption' in collection && <p className="mt-3 text-sm text-muted-foreground">{collection.caption}</p>}</div>
        </Reveal>)}
      </div>
    </div>
  </section>;
}
