import { PhotoBox } from '../PhotoBox/PhotoBox';

export function Album({ photos, ...rest }: AlbumProps) {
  return (
    <div className="album flex flex-row flex-wrap gap-6" {...rest}>
      {photos.map((photo) => (
        <PhotoBox
          key={photo.id}
          src={photo.src}
          alt={photo.alt}
          caption={photo.caption}
        />
      ))}
    </div>
  );
}

interface AlbumProps {
  photos: Photo[];
}

interface Photo {
  id: string;
  src: string;
  alt: string;
  caption: string;
}
