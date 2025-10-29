"use client"
import { Component, PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{ fallback?: ReactNode }>;
export class ErrorBoundary extends Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(error: unknown) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.log("Something happened", error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        this.props.fallback ?? (
          <div className="h-full w-full">Ooops! Something went wrong</div>
        )
      );
    }

    return this.props.children;
  }
}
