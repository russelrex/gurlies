import { useEffect, useState } from 'react';
import { Icon, Reveal } from './components';

export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
};

const SOCIAL_FILES = [
  'dd4c5d8118f3bfcf4ef01c8e672b0427.jpg',
  'IMG_2489 2.jpg',
  'IMG_2517 2.jpg',
  'IMG_2538 2.jpg',
  'IMG_2555.jpg',
  'IMG_2564 2.jpg',
  'IMG_2598.jpg',
  'IMG_2661.jpg',
  'IMG_2662.jpg',
  'IMG_2664.jpg',
  'IMG_2665.jpg',
  'IMG_2673 2.jpg',
  'IMG_2742.jpg',
  'IMG_2746 2.jpg',
  'IMG_2915 2.jpg',
  'IMG_2950.jpg',
  'IMG_5512.jpg',
  'IMG_5577.jpg',
  'IMG_5578.jpg',
  'IMG_5579.jpg',
  'IMG_5580.jpg',
  'IMG_5581.jpg',
  'IMG_5582.jpg',
  'IMG_5583.jpg',
  'IMG_5584.jpg',
  'IMG_5585.jpg',
  'IMG_5597.jpg',
  'IMG_5600.jpg',
  'IMG_5616.jpg',
  'IMG_5627.jpg',
] as const;

/** Shared social photos for Café Gallery + Boutique Customer Favorites */
export const SOCIAL_GALLERY_PHOTOS: GalleryPhoto[] = SOCIAL_FILES.map((file, i) => ({
  id: `social-${i + 1}`,
  src: `/cafe/social_jul_13/${encodeURIComponent(file)}`,
  alt: `Hey Gurlies café and boutique moments — photo ${i + 1}`,
}));

export function ImageLightbox({
  photos,
  activeIndex,
  onClose,
  onChange,
  label = 'photo',
}: {
  photos: GalleryPhoto[];
  activeIndex: number;
  onClose: () => void;
  onChange: (index: number) => void;
  label?: string;
}) {
  const photo = photos[activeIndex];
  const total = photos.length;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onChange((activeIndex + 1) % total);
      if (event.key === 'ArrowLeft') onChange((activeIndex - 1 + total) % total);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, onChange, onClose, total]);

  if (!photo) return null;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${label} image viewer`}
      onClick={onClose}
    >
      <button
        type="button"
        className="lightbox__close"
        onClick={onClose}
        aria-label="Close fullscreen viewer"
      >
        <Icon name="x" size={20} />
      </button>
      <button
        type="button"
        className="lightbox__nav lightbox__nav--prev"
        onClick={(e) => {
          e.stopPropagation();
          onChange((activeIndex - 1 + total) % total);
        }}
        aria-label="Show previous image"
      >
        <Icon name="chevL" size={24} />
      </button>
      <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
        <img className="lightbox__img" src={photo.src} alt={photo.alt} />
        <figcaption className="lightbox__caption">
          {activeIndex + 1} / {total}
        </figcaption>
      </figure>
      <button
        type="button"
        className="lightbox__nav lightbox__nav--next"
        onClick={(e) => {
          e.stopPropagation();
          onChange((activeIndex + 1) % total);
        }}
        aria-label="Show next image"
      >
        <Icon name="chevR" size={24} />
      </button>
    </div>
  );
}

const PAGE_SIZE = 12;

export function PhotoGallery({
  photos = SOCIAL_GALLERY_PHOTOS,
  pageSize = PAGE_SIZE,
  className = '',
}: {
  photos?: GalleryPhoto[];
  pageSize?: number;
  className?: string;
}) {
  const [page, setPage] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const totalPages = Math.max(1, Math.ceil(photos.length / pageSize));
  const safePage = Math.min(page, totalPages - 1);
  const start = safePage * pageSize;
  const pagePhotos = photos.slice(start, start + pageSize);

  return (
    <div className={`photo-gallery ${className}`.trim()}>
      <Reveal className="photo-gallery__grid">
        {pagePhotos.map((photo, i) => {
          const absoluteIndex = start + i;
          return (
            <button
              key={photo.id}
              type="button"
              className="photo-gallery__item"
              onClick={() => setActiveIndex(absoluteIndex)}
              aria-label={`Open photo ${absoluteIndex + 1} of ${photos.length}`}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
            </button>
          );
        })}
      </Reveal>

      {totalPages > 1 && (
        <div className="photo-gallery__pager" role="navigation" aria-label="Gallery pages">
          <button
            type="button"
            className="photo-gallery__pager-btn"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={safePage === 0}
            aria-label="Previous page"
          >
            <Icon name="chevL" size={18} />
          </button>
          <div className="photo-gallery__pages">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                type="button"
                className="photo-gallery__page"
                data-active={safePage === i ? '1' : '0'}
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
                aria-current={safePage === i ? 'page' : undefined}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="photo-gallery__pager-btn"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={safePage >= totalPages - 1}
            aria-label="Next page"
          >
            <Icon name="chevR" size={18} />
          </button>
        </div>
      )}

      {activeIndex !== null && (
        <ImageLightbox
          photos={photos}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onChange={setActiveIndex}
          label="gallery"
        />
      )}
    </div>
  );
}
