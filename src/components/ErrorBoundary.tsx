import { Component, ErrorInfo, ReactNode } from 'react';
import { Alert } from 'react-bootstrap';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mt-5">
          <Alert variant="danger">
            <h4>Something went wrong</h4>
            <p>Please refresh the page or try again later</p>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}