export default function ServicesLayout({
  children,
  details,
}: Readonly<{
  children: React.ReactNode;
  details: React.ReactNode;
}>) {
  return (
    <div className="sm:max-h-screen col-start-1 col-span-6 row-span-4 flex flex-col sm:flex-row gap-4 p-6 mx-6">
      {children}
      {details}
    </div>
  );
}
