'use client';
interface ErrorProps {
  error: Error & { digest?: string }; // built-in Next.js error type
  reset: () => void; // function to reset the error boundary
}

export default function error({ error, reset }: ErrorProps) {
  return (
    <div>
      <h1>{error.message}</h1>
      <button onClick={reset}>Reset</button>
    </div>
  )
}