import '../src/styles.css';

export const metadata = {
  title: 'Darshonic',
  description: 'Intelligent software systems for businesses built to scale.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
