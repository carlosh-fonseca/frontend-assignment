export function PhotoBox({
  src,
  alt,
  caption,
  authorName,
  authorUsername,
  ...rest
}: PhotoBoxProps) {
  return (
    <div
      className="photo-box bg-slate-100 flex flex-col p-4 w-1/4 h-fit rounded-lg m-auto my-8"
      {...rest}
    >
      <div className="img-wrapper bg-white mt-2 w-full">
        <img src={src} alt={alt} title={caption} className="w-full" />
      </div>
      <div className="caption-wrapper my-2">
        <p className="text-sm font-bold text-left">{authorName}</p>
        <p className="text-sm font-bold text-left">{`(@${authorUsername})`}</p>
      </div>
      <div className="caption-wrapper my-2 truncate hover:text-wrap">
        <p className="text-sm font-bold text-center">{caption}</p>
      </div>
    </div>
  );
}

interface PhotoBoxProps {
  src: string;
  alt: string;
  caption: string;
  authorName: string;
  authorUsername: string;
}
