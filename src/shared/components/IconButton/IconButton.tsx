export function IconButton({ icon, title, onClick }: IconButtonProps) {
  return (
    <button
      title={title}
      className="flex-none p-2 rounded-full bg-slate-400 hover:bg-slate-500 h-fit"
      onClick={onClick}
    >
      {icon}
    </button>
  );
}

interface IconButtonProps {
  icon: React.ReactNode;
  title: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
