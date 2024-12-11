import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

export function PhotoBox({
  src,
  alt,
  caption,
  authorName,
  authorUsername,
  authorId,
  actions,
  ...rest
}: PhotoBoxProps) {
  return (
    <div
      className="photo-box bg-slate-100 flex flex-col py-4 px-2 rounded-lg"
      {...rest}
    >
      <div className="img-wrapper w-full bg-white m-auto md:w-full">
        <img src={src} alt={alt} title={caption} className="w-full md:w-full" />
      </div>
      {(!!authorName || !!authorUsername) && (
        <div className="caption-wrapper my-2 flex flex-row">
          <p className="text-sm font-bold text-left">{authorName}</p>
          <NavLink to={`users/${authorId}`}>
            <p className="text-sm font-bold text-left">{`(@${authorUsername})`}</p>
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
  authorName?: string;
  authorUsername?: string;
  authorId?: number;
  actions?: ReactNode;
}
