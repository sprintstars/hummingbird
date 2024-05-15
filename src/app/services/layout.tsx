export default function ServicesLayout({
  children,
  details,
}: Readonly<{
  children: React.ReactNode;
  details: React.ReactNode;
}>) {
  return (
    <>
      {children}
      {details}
    </>
  );
}
