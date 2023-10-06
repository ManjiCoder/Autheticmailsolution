import Link from "next/link";
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-xl font-semibold capitalize mb-3">
            Oops, there is an error!
          </h2>
          <button
            type="button"
            className="hover:bg-slate-100 w-36 shadow-md rounded-md p-2 font-medium mb-3"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
          <button
            type="button"
            className="hover:bg-slate-100 w-36 shadow-md rounded-md p-2 font-medium "
            onClick={() => this.setState({ hasError: false })}
          >
            <Link href={"/"}>Go to Home</Link>
          </button>
        </div>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
