import { Component } from 'react'

/**
 * Global error boundary — catches render-time errors in any
 * child component tree and shows a friendly fallback instead
 * of a blank white screen.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Manrope', sans-serif",
            color: '#0D1B2A',
            padding: '2rem',
            textAlign: 'center',
            background: '#FFFAF5',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌸</div>
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '0.5rem',
            }}
          >
            Something went wrong
          </h1>
          <p style={{ color: '#6B7280', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Please refresh the page to continue learning.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#DE3163',
              color: 'white',
              border: 'none',
              padding: '0.75rem 2rem',
              borderRadius: '0.75rem',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            Refresh Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
