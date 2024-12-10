export function ContentLayout({
  title,
  children,
}: {
  title: string;
  children?: JSX.Element;
}) {
  return (
    <div>
      <header>
        <h1 className="text-center">{title}</h1>
        <main>{children}</main>
      </header>
    </div>
  );
}
