const Spinner = () => (
  <div className="spinner" style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}>
    <div
      style={{
        width: 40,
        height: 40,
        border: '4px solid #eee',
        borderTopColor: '#4481c3',
        borderRadius: '50%',
        animation: 'spinner-rotate 0.7s linear infinite',
      }}
    />
    <style>{'@keyframes spinner-rotate { to { transform: rotate(360deg); } }'}</style>
  </div>
);

export default Spinner;
