import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('HomeFeast ErrorBoundary caught error:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.hash = '#my-pass';
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            background: '#FAF8F5',
            fontFamily: 'system-ui, sans-serif'
          }}
        >
          <div
            style={{
              maxWidth: '520px',
              width: '100%',
              background: '#FFFFFF',
              borderRadius: '24px',
              border: '1.5px solid #EAE3D9',
              padding: '36px 24px',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.06)'
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🍲</div>
            <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1C1917', marginBottom: '8px' }}>
              HomeFeast Order Hub
            </h2>
            <p style={{ fontSize: '13.5px', color: '#78716C', marginBottom: '20px', lineHeight: 1.5 }}>
              A UI refresh is required to sync your live tiffin status. Click below to continue smoothly.
            </p>
            <button
              onClick={this.handleReload}
              style={{
                background: '#E8590C',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              🔄 Reload Tiffin Dashboard
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
