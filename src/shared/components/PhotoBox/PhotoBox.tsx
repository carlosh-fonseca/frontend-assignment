import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { User } from '../../../views/albums/api/AlbumsService';

export function PhotoBox({
  src,
  alt,
  caption,
  author,
  actions,
  'data-testid': dataTestId,
  ...rest
}: PhotoBoxProps) {
  return (
    <div
      className="photo-box bg-slate-100 flex flex-col py-4 px-2 rounded-lg"
      data-testid={`${dataTestId}-wrapper`}
      {...rest}
    >
      <div className="img-wrapper w-full bg-white m-auto md:w-full">
        <img
          data-testid={`${dataTestId}-img`}
          src={src}
          alt={alt}
          aria-label={alt}
          title={caption}
          className="w-full"
          loading="lazy"
        />{' '}
      </div>
      {(!!author?.name || !!author?.username) && (
        <div
          className="caption-wrapper my-2 flex flex-row"
          data-testid={`${dataTestId}-author`}
        >
          <p
            className="text-sm font-bold text-left"
            data-testid={`${dataTestId}-author-name`}
          >
            {author?.name}
          </p>
          <NavLink
            to={`users/${author?.id}`}
            data-testid={`${dataTestId}-author-username`}
          >
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
  'data-testid'?: string;
}
