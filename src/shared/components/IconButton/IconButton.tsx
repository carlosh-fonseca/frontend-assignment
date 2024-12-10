export function IconButton({ icon, title }) {
  return (
    <button
      title={title}
      className="flex-none p-2 rounded-full bg-slate-400 hover:bg-slate-500"
    >
      {icon}
    </button>
  );
}
