import type {FallbackProps} from "react-error-boundary";
import ErrorBoundaryFallbackAlert from "@/components/error-boundary/ErrorBoundaryFallbackAlert.tsx";

export default function fallbackRender({error, resetErrorBoundary}: FallbackProps) {
    return <ErrorBoundaryFallbackAlert error={error} resetErrorBoundary={resetErrorBoundary}/>;
}
