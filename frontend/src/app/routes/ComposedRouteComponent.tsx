import { ErrorBoundary } from '../layout/ErrorBoundary';

interface RouteElementProps {
  Component: React.ComponentType<unknown>;
  componentProps?: Record<string, unknown>;
}
export const RouteElement = ({ Component, componentProps }: RouteElementProps) => {
  return (
    <ErrorBoundary>
      <Component {...componentProps} />
    </ErrorBoundary>
  );
};
