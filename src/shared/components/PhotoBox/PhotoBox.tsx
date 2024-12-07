export function PhotoBox({ src, alt, caption, ...rest }: PhotoBoxProps) {
  return (
    <div
      className="photo-box bg-slate-100 flex flex-col p-4 w-1/12 h-fit rounded-lg"
      {...rest}
    >
      <div className="img-wrapper bg-white mt-2 w-full">
        <img src={src} alt={alt} title={caption} className="w-full" />
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
}
