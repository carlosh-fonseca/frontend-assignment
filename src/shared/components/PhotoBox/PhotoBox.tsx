import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { User } from '../../../views/albums/api/AlbumsService';

export function PhotoBox({
  src,
  alt,
  caption,
  author,
  actions,
  ...rest
}: PhotoBoxProps) {
  return (
    <div
      className="photo-box bg-slate-100 flex flex-col py-4 px-2 rounded-lg"
      {...rest}
    >
      <div className="img-wrapper w-full bg-white m-auto md:w-full">
        <object
          data="https://via.placeholder.com/600/cccccc"
          type="image/png"
          className="w-full"
          aria-label={alt}
        >
          <img
            src={src}
            alt={alt}
            title={caption}
            className="w-full"
            loading="lazy"
          />{' '}
        </object>
      </div>
      {(!!author?.name || !!author?.username) && (
        <div className="caption-wrapper my-2 flex flex-row">
          <p className="text-sm font-bold text-left">{author?.name}</p>
          <NavLink to={`users/${author?.id}`}>
            <p className="text-sm font-bold text-left">{`(@${author?.username})`}</p>
          </NavLink>
        </div>
      )}
      <div className="caption-wrapper mt-2 text-wrap w-full">
        <p className="text-sm font-bold text-center">{caption}</p>
      </div>
      <div className="caption-wrapper mt-2 text-wrap w-full">{actions}</div>
    </div>
  );
}

interface PhotoBoxProps {
  src: string;
  alt: string;
  caption: string;
  author?: User;
  actions?: ReactNode;
}
