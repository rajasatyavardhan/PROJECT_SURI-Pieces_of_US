export type CollectionPhoto = { src: string; alt: string };
const photo = (name: string, alt: string): CollectionPhoto => ({ src: `/media/memories/${name}.webp`, alt });
export const storyCollections = [
  [{ src: '/media/childhood.webp', alt: 'Suri in her younger-years portrait' }, photo('reviewed-12', 'Suri in her school uniform'), photo('reviewed-26', 'Another school-day memory of Suri')],
  [photo('memory-05', 'Suri dressed for a celebration'), { src: '/media/memories/memory-04.jpg', alt: 'Suri in a red celebration outfit' }],
  [{ src: '/media/memories/memory-07.jpg', alt: 'Suri and Raja together with a birthday cake' }, photo('reviewed-71', 'Suri and Raja with family at his sister’s wedding')],
];
export const galleryCollections = [
  { title: 'Our favourite us', photos: [{ src: '/media/us-together.jpg', alt: 'Suri and Raja together' }, photo('reviewed-76', 'Both of us with family at the wedding')] },
  { title: 'A little Suri sunshine', photos: [photo('extra-01', 'Suri and her little dog memories'), photo('reviewed-83', 'Suri in her favourite red outfit')] },
  { title: 'That smile, every time', photos: [photo('memory-01', 'Suri in lilac beside a palm tree'), photo('memory-02', 'Suri reflected in a rain-speckled mirror'), photo('memory-03', 'Suri smiling in a floral outfit')] },
  { title: 'The people who love you', photos: [photo('reviewed-11', 'A family moment reviewed by Raja'), photo('reviewed-13', 'Suri with family')] },
  { title: 'Always their little girl', caption: 'You’ll always be their little girl. (Mine too, hehe.)', photos: [photo('reviewed-75', 'Suri with her mother and father'), photo('reviewed-60', 'Suri with her father and Raja’s father'), photo('reviewed-61', 'Suri with Raja’s father'), photo('memory-10', 'Suri with family at a celebration')] },
  { title: 'Future doctor, lifelong memories', photos: [photo('reviewed-18', 'Suri with her MBBS friends'), photo('reviewed-22', 'A college celebration with friends'), photo('reviewed-24', 'Suri and a college friend'), photo('reviewed-25', 'A mirror selfie with her MBBS friends')] },
];
// Reserved here, not reused as mosaic tiles.
export const backgroundPhotos = ['/media/mosaic/piece-0001.webp', '/media/mosaic/piece-0002.webp'];
