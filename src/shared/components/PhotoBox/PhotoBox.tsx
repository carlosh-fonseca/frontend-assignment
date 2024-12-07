export function PhotoBox({ src, alt, caption, ...rest }: PhotoBoxProps) {
  return (
    <div
      style={{ width: 500, height: 100 }}
      className="photo-box bg-slate-100"
      {...rest}
    >
      <img src={src} alt={alt} />
      <p>{caption}</p>
    </div>
  );
}

interface PhotoBoxProps {
  src: string;
  alt: string;
  caption: string;
}
