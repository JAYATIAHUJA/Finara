import React from 'react';

function Footer() {
  return (
    <footer style={{
      padding: '24px 48px',
      textAlign: 'center',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(0,0,0,0.4)',
      backdropFilter: 'blur(12px)',
      marginTop: 'auto'
    }}>
      <p style={{
        margin: 0,
        fontSize: '0.95rem',
        color: 'rgba(255,255,255,0.6)',
        fontWeight: 500
      }}>
        Made by Team <span style={{color: 'var(--accent)', fontWeight: 600}}>Hacka Noodles</span> in 2025
      </p>
    </footer>
  );
}

export default Footer;
