import React from 'react';
import { Typography } from '../../shared/components/Typography';
import { CircleAlert } from 'lucide-react';

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-y-3">
          <CircleAlert className="w-10 h-10 text-red-400" />
          <Typography variant="subtitle" className="text-red-400">
            Sorry, there is an error. We are looking into it.
          </Typography>
        </div>
      );
    }
    return this.props.children;
  }
}
