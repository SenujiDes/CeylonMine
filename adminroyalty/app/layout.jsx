export const metadata = {
  title: 'Mining Royalty Calculator',
  description: 'Calculate mining royalties based on blasting parameters',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
} 