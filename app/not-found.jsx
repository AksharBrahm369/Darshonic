export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '24px', color: '#f4f7fa', background: '#0e1116' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 8px', fontSize: '1.5rem' }}>Page not found</h2>
        <p style={{ margin: 0, color: 'rgba(244, 247, 250, 0.72)' }}>The page you are looking for does not exist.</p>
      </div>
    </div>
  );
}
